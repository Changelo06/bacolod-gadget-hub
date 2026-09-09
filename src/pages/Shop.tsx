import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { CatalogState } from "@/components/CatalogState";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BUDGETS, CATEGORIES, DEMO_MODE, filterCatalog } from "@/lib/catalog";

const Shop = () => {
  const [params,setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const [draft,setDraft] = useState(query);
  useEffect(() => { setDraft(query); },[query]);
  const {data:products = [],isLoading,isError,isFetching,refetch} = useProducts(undefined,100);
  const sorted = useMemo(() => filterCatalog(products,params),[products,params]);
  const brands = Array.from(new Set([...products.map((item) => item.node.vendor), params.get("brand")].filter(Boolean))).sort();
  const change = (key:string,value:string) => { const next = new URLSearchParams(params); if(value) next.set(key,value); else next.delete(key); if(key === "category") next.delete("q"); setParams(next); };
  const filtered = ["q","brand","category","budget","condition"].some((key) => params.has(key));
  return <div className="container section-space catalog-page">
    <header className="catalog-heading"><div><h1>Find your next device.</h1><p className="mt-3 text-muted-foreground">Choose a category, brand or budget. Compare the options that fit.</p></div><Link to="/store" className="text-link">Check with a branch</Link></header>
    <nav aria-label="Device categories" className="catalog-tabs"><Link to="/shop" aria-current={!params.get("category") && !query ? "page" : undefined}>All devices</Link>{CATEGORIES.map((category) => {const next = new URLSearchParams(params); next.set("category",category.id); next.delete("q"); return <Link key={category.id} to={'/shop?' + next} aria-current={params.get("category") === category.id ? "page" : undefined}>{category.label}</Link>;})}</nav>
    <div className="catalog-workspace">
      <aside className="catalog-filters" aria-label="Filter devices"><h2>Filter devices</h2>
        <form onSubmit={(event) => {event.preventDefault();change("q",draft.trim());}} className="catalog-search"><label htmlFor="catalog-search">Search a model</label><Input id="catalog-search" name="q" type="search" autoComplete="off" value={draft} onChange={(event)=>setDraft(event.target.value)} placeholder="e.g. Samsung…" className="h-11 text-base" /><Button type="submit" variant="outline" className="h-11">Search</Button></form>
        <div className="filter-fields"><label>Brand<select name="brand" value={params.get("brand") ?? ""} onChange={(event)=>change("brand",event.target.value)}><option value="">All brands</option>{brands.map((brand)=><option key={brand} value={brand}>{brand}</option>)}</select></label><label>Budget in pesos<select name="budget" value={params.get("budget") ?? ""} onChange={(event)=>change("budget",event.target.value)}><option value="">All prices</option>{BUDGETS.map((budget)=><option key={budget.id} value={budget.id}>{budget.label}</option>)}</select></label><label>Condition<select name="condition" value={params.get("condition") ?? ""} onChange={(event)=>change("condition",event.target.value)}><option value="">New & pre-owned</option><option value="New">New</option><option value="Pre-owned">Pre-owned</option></select></label></div>
        {filtered && <Link to="/shop" className="text-link">Clear all filters</Link>}
      </aside>
      <section className="catalog-results" aria-label="Device results"><div className="results-toolbar"><p role="status">{isLoading ? "Loading devices…" : isError ? "Catalog unavailable" : sorted.length + (sorted.length === 1 ? " device" : " devices")}{DEMO_MODE && !isLoading && !isError ? " in this sample catalog" : ""}</p><label className="sort-label">Sort by<select name="sort" value={params.get("sort") ?? "featured"} onChange={(event)=>change("sort",event.target.value)}><option value="featured">Catalog order</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="title">Name: A to Z</option></select></label></div>
      {isLoading ? <CatalogState loading /> : isError ? <CatalogState error onRetry={()=>refetch()} retrying={isFetching} /> : sorted.length===0 ? <div className="empty-filter"><h2>No devices match these filters.</h2><p>Try a different brand, a higher budget or fewer filters.</p><Button asChild variant="outline"><Link to="/shop">Reset filters</Link></Button></div> : <div className="product-grid shop-grid">{sorted.map((product)=><ProductCard key={product.node.id} product={product} />)}</div>}
      {!DEMO_MODE && products.length===100 && <p className="mt-5 text-sm text-muted-foreground">Filters apply to the first 100 listed devices. Ask your branch about additional models.</p>}
      </section>
    </div>
  </div>;
};
export default Shop;
