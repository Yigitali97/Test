import Axios from "axios";

export const axiosInstance = Axios.create({
  baseURL: "http://20.100.202.137:8083/api/v1",
  headers: {
    "API-KEY": "secret-api-key",
  },
});

export const API = {
  getDocuments: () => axiosInstance.get("/documents"),
  getSignleDocuments: (payload) => axiosInstance.get(`/document/${payload}`),
  createDocument: (payload) => axiosInstance.post("/documents/create", payload),
};
