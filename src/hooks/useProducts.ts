import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct, storefrontApiRequest } from "@/lib/shopify";
import samples from "@/data/sample-products.json";
import { DEMO_MODE, productCondition } from "@/lib/catalog";

export function useProducts(query?: string, first = 24, enabled = true) {
  return useQuery({
    enabled,
    retry: 1,
    staleTime: 60000,
    queryKey: ["products", query, first],
    queryFn: async () => {
      if (DEMO_MODE) {
        const products = samples as ShopifyProduct[];
        if (!query) return products.slice(0, first);
        if (/cpo|pre-owned/i.test(query)) return products.filter((item) => productCondition(item) === "Pre-owned").slice(0, first);
        const terms = query.replace(/title:|\*/g, "").toLowerCase().split(/\s+or\s+/);
        return products.filter((item) => terms.some((term) => `${item.node.title} ${item.node.vendor} ${item.node.productType}`.toLowerCase().includes(term.trim()))).slice(0, first);
      }
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query: query ?? null });
      return (data?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });
}

export function useProductByHandle(handle: string | undefined) {
  return useQuery({
    retry: 1,
    queryKey: ["product", handle],
    enabled: !!handle,
    queryFn: async () => {
      if (DEMO_MODE) return (samples as ShopifyProduct[]).find((item) => item.node.handle === handle)?.node ?? null;
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.product as ShopifyProduct["node"] | null;
    },
  });
}
