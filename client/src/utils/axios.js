import axiosInstance from "axios";

const axios = axiosInstance.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout:300000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

// Add a request interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Add a response interceptor
// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('accessToken');
//       window.location = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default axios;
