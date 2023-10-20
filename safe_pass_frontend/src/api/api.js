import axios from "axios";
import https from "https";

const api = axios.create({
  //baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "http://localhost:8090",
  // baseURL: "https://localhost:443",
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
});

export default api;
