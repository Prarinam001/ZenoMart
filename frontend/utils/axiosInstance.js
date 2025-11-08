import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // allow cookies
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("refresh")
    ) {
      originalRequest._retry = true
      try {
        await axiosInstance.post("/api/account/refresh");
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
