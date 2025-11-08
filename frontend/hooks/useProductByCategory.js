import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory, getSearchProduct, getProductDetailBySlug } from "@/services/ProductService";


export default function useProductsByCategory() {
  const {
    data: clothing = [],
    isLoading: loadingClothing,
    isError: errorClothing,
  } = useQuery({
    queryKey: ["products", "clothing"],
    queryFn: () => getProductsByCategory("clothing"),
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: electronics = [],
    isLoading: loadingElectronics,
    isError: errorElectronics,
  } = useQuery({
    queryKey: ["products", "electronics"],
    queryFn: () => getProductsByCategory("electronics"),
    staleTime: 5 * 60 * 1000,
  });

  return {
    clothing,
    electronics,
    isLoading: loadingClothing || loadingElectronics,
    isError: errorClothing || errorElectronics,
  };
}


export function useSearchProduct(page, searchTerm){
  const {
    data: products=[], 
    isLoading: loadingProducts,
    isError: errorProduct,
    refetch
  } = useQuery({
    queryKey: ['products', page, searchTerm],
    queryFn: () => getSearchProduct(page, searchTerm),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
  return {
    products,
    isLoading: loadingProducts,
    isError: errorProduct,
    refetch
  }
}

export const useProductDetailBySlug = (slug) => {
  const {
    data: product = null,
    isLoading: loadingProduct,
    isError: errorProduct,
    refetch,
  } = useQuery({
    queryKey: ['productDetail', slug],
    queryFn: () => getProductDetailBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  return {
    product,
    isLoading: loadingProduct,
    isError: errorProduct,
    refetch,
  };
}
