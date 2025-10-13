import axiosInstance from "@/utils/axiosInstance";

export const getProductsByCategory = async (category) => {
  const response = await axiosInstance.get(`/api/products/?categories=${category}`);
  return response.data.items || [];
};
