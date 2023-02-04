import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/api";
import "./style.css";

const defaultFormData = {
  field_seq: "",
  is_mandatory: 1,
  field_type: 1,
  field_name: "",
  select_values: null,
};

const CreateDocument = () => {
  const navigate = useNavigate();
  const [variants, setVariants] = useState([defaultFormData]);
  const [title, setTitle] = useState("");

  const handleDynamicData = (key, value, formIndex) => {
    const newState = [...variants];
    if (key === "field_type" && value === "2") {
      newState[formIndex] = {
        ...newState[formIndex],
        [key]: value,
        select_values: [
          {
            value: true,
            label: "Agree",
          },
          {
            value: false,
            label: "Disagree",
          },
        ],
      };
    } else {
      newState[formIndex] = {
        ...newState[formIndex],
        [key]: value,
      };
    }
    setVariants(newState);
  };

  const handleIncrementInputs = () => {
    setVariants((prevVariants) => [...prevVariants, defaultFormData]);
  };

  const { mutate, isLoading } = useMutation(async (payload) => {
    await API.createDocument(payload)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log("Create error", err));
  });

  const onSubmit = () => {
    const modified = {
      document_name: title,
      form_values: variants,
    };
    mutate(modified);
  };

  return (
    <div className="container">
      <div className="form">
        <label>Document Title</label>
        <input
          className="text-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="divider" />
        {variants?.map((form, formIndex) => (
          <div key={formIndex}>
            <label>Field Sequence (weight)</label>
            <input
              className="text-input"
              type="text"
              onChange={(e) =>
                handleDynamicData("field_seq", e.target.value, formIndex)
              }
              required
            />
            <label>Field Type</label>
            <select
              className="select-item"
              onChange={(e) =>
                handleDynamicData("field_type", e.target.value, formIndex)
              }
            >
              <option value={1}>Input</option>
              <option value={2}>Select</option>
              <option value={3}>NumberInput</option>
            </select>
            <label>Field Name</label>
            <input
              className="text-input"
              type="text"
              onChange={(e) =>
                handleDynamicData("field_name", e.target.value, formIndex)
              }
            />
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={form.is_mandatory}
                onChange={() =>
                  handleDynamicData(
                    "is_mandatory",
                    form.is_mandatory ? 0 : 1,
                    formIndex
                  )
                }
              />
              <label>Mandatory</label>
            </div>
            <div
              style={{
                width: "100%",
                height: 1,
                background: "lightgrey",
                margin: "20px 0",
              }}
            />
          </div>
        ))}

        {/* <span className="divider" /> */}
        <div className="button-containers">
          <button
            type="button"
            className="add-more-btn"
            onClick={handleIncrementInputs}
          >
            Add more
          </button>
          <button type="submit" onClick={onSubmit}>
            {isLoading ? "..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDocument;
