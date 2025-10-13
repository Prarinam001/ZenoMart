import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "@/services/ProductService";

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