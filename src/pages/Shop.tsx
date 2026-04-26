import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyProducts } from "./Index";

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const [sort, setSort] = useState<string>("featured");

  const shopifyQuery = useMemo(() => (query.trim() ? `title:*${query.trim()}*` : undefined), [query]);
  const { data: products = [], isLoading } = useProducts(shopifyQuery, 48);

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "price-asc") {
      list.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
    } else if (sort === "price-desc") {
      list.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
    } else if (sort === "title") {
      list.sort((a, b) => a.node.title.localeCompare(b.node.title));
    }
    return list;
  }, [products, sort]);

  return (
    <div className="container py-12 md:py-16">
      <header className="mb-8">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Shop.</h1>
        <p className="text-foreground/70 mt-2 text-lg">Smartphones, laptops, tablets, accessories and more.</p>
      </header>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            const next = new URLSearchParams(params);
            if (e.target.value) next.set("q", e.target.value);
            else next.delete("q");
            setParams(next, { replace: true });
          }}
          placeholder="Search products…"
          className="h-11 max-w-md rounded-full bg-secondary/60 px-5"
        />
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-11 w-full sm:w-48 rounded-full bg-secondary/60 px-5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="title">Name (A–Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-3xl bg-secondary/60 animate-pulse" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <EmptyProducts />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sorted.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Shop;
