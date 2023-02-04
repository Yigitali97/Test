import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../services/api";
import "./style.css";

const SingleDocument = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.documentId;

  const { data, isLoading } = useQuery(
    "signle document",
    async () => {
      return await API.getSignleDocuments(id)
        .then((res) => res.data)
        .catch((err) => console.log("Error", err));
    },
    {
      enabled: !!id,
    }
  );

  return (
    <div className="container">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>{data?.document_name}</h1>
          <label>Name</label>
          <p></p>
          <label>Gender</label>
          <select>
            <option>Male</option>
            <option>Female</option>
          </select>
          <label style={{ marginBottom: "25px" }}>Age</label>
          <p></p>
          <button onClick={() => navigate("/")}>Back</button>
        </div>
      )}
    </div>
  );
};

export default SingleDocument;
