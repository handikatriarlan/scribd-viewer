import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Token": process.env.API_ACCESS_TOKEN,
  },
});

export default axiosInstance;
