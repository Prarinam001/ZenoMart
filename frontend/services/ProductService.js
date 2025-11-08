import axiosInstance from "@/utils/axiosInstance";

export const getProductsByCategory = async (category) => {
  const response = await axiosInstance.get(`/api/products/?categories=${category}`);
  return response.data.items || [];
};


export const getSearchProduct = async (page, searchTerm) => {
  const limit = 6;
  const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  if (searchTerm.trim()!=="") 
    params.append("title", searchTerm);

  const response = await axiosInstance.get(`/api/products/search?${params.toString()}`);
  return response.data.items || [];
};


export const getProductDetailBySlug = async(slug) => {
  const response = await axiosInstance.get(`/api/products/${slug}`);
  console.log("response: ", response)
  return response.data || []
}