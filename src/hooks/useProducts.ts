import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct, storefrontApiRequest } from "@/lib/shopify";

export function useProducts(query?: string, first = 24) {
  return useQuery({
    queryKey: ["products", query, first],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query: query ?? null });
      return (data?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });
}

export function useProductByHandle(handle: string | undefined) {
  return useQuery({
    queryKey: ["product", handle],
    enabled: !!handle,
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.product as ShopifyProduct["node"] | null;
    },
  });
}
