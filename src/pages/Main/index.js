import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../services/api";
import "./style.css";

const Main = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery("getDocuments", async () => {
    return await API.getDocuments()
      .then((res) => {
        // console.log("Documents", res.data);
        return res.data;
      })
      .catch((error) => {
        console.log("getDocuemts Error", error.response.data);
      });
  });

  return (
    <div className="wrapper">
      <div>
        <div className="create-new-button-container">
          <button
            className="create-new-btn"
            onClick={() => navigate("/create")}
          >
            New document form
          </button>
        </div>
        <div className="table-container">
          <div className="table-header">
            <p>ID</p>
            <p>Document Title</p>
            <p>Created Date</p>
            <p>Document Size</p>
            <p></p>
          </div>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <div className="table-body">
              {data?.map((item, idx) => {
                const created_at = new Date(
                  item.created_at
                ).toLocaleDateString();
                return (
                  <div key={idx}>
                    <p>{item.id}</p>
                    <p>{item.document_name}</p>
                    <p>{created_at}</p>
                    <p>{item.field_count}</p>
                    <p>
                      <Link
                        to={`/document/${item.id}`}
                        state={{ documentId: item?.id }}
                      >
                        Document preview
                      </Link>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
