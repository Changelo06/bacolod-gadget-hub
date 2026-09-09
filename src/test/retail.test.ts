import { describe, expect, it } from "vitest";
import samples from "@/data/sample-products.json";
import type { ShopifyProduct } from "@/lib/shopify";
import { categoryBrands, categoryUrl } from "@/lib/retail";
import { filterCatalog } from "@/lib/catalog";
const products = samples as ShopifyProduct[];
describe("Retail category navigation", () => {
  it("limits brand choices to the category and carries both filters into the destination", () => {
    expect(categoryBrands(products, "phones")).not.toContain("Asus");
    expect(categoryBrands(products, "laptops")).toContain("Asus");
    const url = categoryUrl("laptops", "Asus");
    expect(filterCatalog(products, new URLSearchParams(url.split("?")[1])).map((product) => product.node.handle)).toEqual(["sample-79"]);
  });
  it("preserves the pre-owned condition when filtering by brand", () => {
    const url = categoryUrl("pre-owned", "Samsung");
    expect(filterCatalog(products, new URLSearchParams(url.split("?")[1])).map((product) => product.node.handle)).toEqual(["sample-133"]);
  });
});
