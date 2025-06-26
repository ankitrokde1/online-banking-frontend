import axios from "axios";
import { showError } from "../utils/toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  withCredentials: true, // ✅ send HTTP-only cookies
});

// let isRedirecting = false;

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     const msg =
//       error.response?.data?.message ||
//       "Something went wrong. Please try again.";

//     showError(msg);

//     if (
//       status === 401 &&
//       !isRedirecting &&
//       window.location.pathname !== "/login"
//     ) {
//       isRedirecting = true;
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );


// 401 Unauthorized then redirect to login
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Redirect to login page
//       window.location.href = "/login"; // Adjust the path as needed
//     }
//     return Promise.reject(error);
//   }
// );



export default axiosInstance;
