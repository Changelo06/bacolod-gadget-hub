import { describe, it, expect } from "vitest";
import samples from "@/data/sample-products.json";
import { catalogCategory, filterCatalog } from "@/lib/catalog";
import type { ShopifyProduct } from "@/lib/shopify";
const products = samples as ShopifyProduct[];
describe("Catalog filters", () => {
  it("keeps earphones out of the phone category", () => {
    const earphones = products.find((p) => p.node.vendor === "Beats")!;
    expect(catalogCategory(earphones)).toBe("audio");
    expect(filterCatalog(products,new URLSearchParams("category=phones"))).not.toContain(earphones);
  });
  it("combines brand, budget and category instead of replacing filters", () => {
    const result = filterCatalog(products,new URLSearchParams("brand=Samsung&category=phones&budget=20000"));
    expect(result.map((p)=>p.node.handle)).toEqual(["sample-133"]);
    expect(filterCatalog(products,new URLSearchParams("brand=Samsung&category=phones&budget=10000"))).toEqual([]);
  });
  it("sorts by numeric price and restricts under-budget matches strictly", () => {
    const result=filterCatalog(products,new URLSearchParams("sort=price-asc&budget=10000"));
    const prices=result.map((p)=>Number(p.node.priceRange.minVariantPrice.amount));
    expect(prices).toEqual([2990,7990,8990,9990]);
  });
  it("supports existing category URLs and the pre-owned selection", () => {
    expect(filterCatalog(products,new URLSearchParams("q=phone&condition=Pre-owned")).map((p)=>p.node.handle)).toEqual(["sample-133","sample-123"]);
  });
  it("matches a brand and model together", () => {
    expect(filterCatalog(products,new URLSearchParams("q=samsung+tab")).map((p)=>p.node.handle)).toEqual(["sample-160"]);
  });
  it("separates monitor, PC and peripheral categories while preserving the old combined URL", () => {
    const fixtures = ["Samsung monitor", "Lenovo desktop", "Logitech keyboard"].map((title) => ({ node: { ...products[0].node, title, productType: "" } }));
    expect(fixtures.map(catalogCategory)).toEqual(["monitors", "pcs", "peripherals"]);
    expect(filterCatalog(fixtures, new URLSearchParams("category=computers"))).toHaveLength(2);
    expect(filterCatalog(fixtures, new URLSearchParams("category=monitors"))).toEqual([fixtures[0]]);
  });
  it("includes audio in the Others browsing destination", () => {
    expect(filterCatalog(products, new URLSearchParams("category=others&brand=Beats"))).toHaveLength(1);
  });
});
