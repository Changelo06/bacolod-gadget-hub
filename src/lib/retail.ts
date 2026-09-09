import type { ShopifyProduct } from "./shopify";
import { catalogCategory, productCondition } from "./catalog";

export const RETAIL_CATEGORIES = [
  { id: "phones", label: "Phones" }, { id: "tablets", label: "Tablets" },
  { id: "laptops", label: "Laptops" }, { id: "monitors", label: "Monitors" },
  { id: "pcs", label: "PC" }, { id: "peripherals", label: "Peripherals" },
  { id: "pre-owned", label: "Pre-owned" }, { id: "others", label: "Others" },
];
export function categoryProducts(products: ShopifyProduct[], category: string) {
  return products.filter((product) => category === "pre-owned" ? productCondition(product) === "Pre-owned" : category === "others" ? ["others", "audio", "accessories"].includes(catalogCategory(product)) : catalogCategory(product) === category);
}
export function categoryBrands(products: ShopifyProduct[], category: string) {
  return Array.from(new Set(categoryProducts(products, category).map((product) => product.node.vendor).filter((brand): brand is string => !!brand))).sort();
}
export function categoryUrl(category: string, brand?: string) {
  const params = new URLSearchParams(category === "pre-owned" ? { condition: "Pre-owned" } : { category });
  if (brand) params.set("brand", brand);
  return "/shop?" + params;
}
