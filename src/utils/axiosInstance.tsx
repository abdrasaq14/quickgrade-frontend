import axios from "axios";

// backend url
const axiosInstance = axios.create({
  baseURL: "https://api-quickgrade.onrender.com",
  withCredentials: true,
});

// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;

// },
//     (error) => {
//         return Promise.reject(error);
//     }
// )

export default axiosInstance;
