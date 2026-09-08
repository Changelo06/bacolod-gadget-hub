import type { ShopifyProduct } from "./shopify";

export const DEMO_MODE = import.meta.env.VITE_CATALOG_MODE !== "live";
export const CATEGORIES = [
  { id: "phones", label: "Phones", terms: "smartphone phone iphone oppo realme vivo" },
  { id: "laptops", label: "Laptops", terms: "laptop macbook zenbook matebook yoga" },
  { id: "tablets", label: "Tablets", terms: "tablet ipad tab" },
  { id: "audio", label: "Audio", terms: "earphones headphones airpods beats speaker" },
  { id: "accessories", label: "Accessories", terms: "accessories accessory charger case cable watch" },
  { id: "computers", label: "PCs & displays", terms: "desktop monitor tv" },
];
export const BUDGETS = [
  { id: "10000", label: "Under ₱10,000", max: 10000 },
  { id: "20000", label: "Under ₱20,000", max: 20000 },
  { id: "40000", label: "Under ₱40,000", max: 40000 },
];
export function productCondition(product: ShopifyProduct) {
  return product.node.condition ?? (/cpo|pre.?owned/i.test(product.node.title) ? "Pre-owned" : "New");
}
export function catalogCategory(product: ShopifyProduct) {
  const type = product.node.productType?.toLowerCase();
  if (type === "smartphones") return "phones";
  if (type === "laptops" || type === "tablets") return type;
  const text = `${product.node.title} ${type ?? ""}`.toLowerCase();
  const categories = [...CATEGORIES].sort((a, b) => Number(b.id === "audio") - Number(a.id === "audio"));
  return categories.find((item) => item.terms.split(" ").some((term) => new RegExp(`\\b${term}s?\\b`, "i").test(text)))?.id;
}
export function filterCatalog(products: ShopifyProduct[], params: URLSearchParams) {
  const query = (params.get("q") ?? "").trim().toLowerCase();
  const legacyCategory = ({ phone: "phones", laptop: "laptops", tablet: "tablets", monitor: "computers", tv: "computers", "pc OR desktop": "computers", "accessory OR accessories": "accessories" } as Record<string, string>)[params.get("q") ?? ""];
  const category = CATEGORIES.find((item) => item.id === (params.get("category") || legacyCategory));
  const brand = (params.get("brand") ?? "").toLowerCase();
  const budget = BUDGETS.find((item) => item.id === params.get("budget"));
  const condition = params.get("condition");
  const filtered = products.filter((product) => {
    const text = `${product.node.title} ${product.node.vendor ?? ""} ${product.node.productType ?? ""}`.toLowerCase();
    if (category && catalogCategory(product) !== category.id) return false;
    if (query && !legacyCategory && !query.split(/\s+/).every((term) => text.includes(term))) return false;
    if (brand && product.node.vendor?.toLowerCase() !== brand) return false;
    if (budget && (product.node.priceRange.minVariantPrice.currencyCode !== "PHP" || Number(product.node.priceRange.minVariantPrice.amount) >= budget.max)) return false;
    if (condition && productCondition(product) !== condition) return false;
    return true;
  });
  const sort = params.get("sort");
  if (sort === "price-asc" || sort === "price-desc") filtered.sort((a, b) => a.node.priceRange.minVariantPrice.currencyCode.localeCompare(b.node.priceRange.minVariantPrice.currencyCode) || (Number(a.node.priceRange.minVariantPrice.amount) - Number(b.node.priceRange.minVariantPrice.amount)) * (sort === "price-desc" ? -1 : 1));
  if (sort === "title") filtered.sort((a, b) => a.node.title.localeCompare(b.node.title));
  return filtered;
}
