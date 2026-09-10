import { useState } from "react";
import { Link } from "react-router-dom";
import { Smartphone, Tablet, Laptop, Monitor, Computer, Keyboard, Headphones, RefreshCw } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CatalogState } from "@/components/CatalogState";
import { PromoCarousel } from "@/components/PromoCarousel";
import { LaptopBrands } from "@/components/LaptopBrands";
import { useProducts } from "@/hooks/useProducts";
import { DEMO_MODE, filterCatalog } from "@/lib/catalog";
import { categoryBrands, categoryProducts, categoryUrl, RETAIL_CATEGORIES } from "@/lib/retail";
import type { ShopifyProduct } from "@/lib/shopify";

const icons = [Smartphone, Tablet, Laptop, Monitor, Computer, Keyboard, RefreshCw, Headphones];
function ProductShelf({ title, note, products, href }: { title: string; note?: string; products: ShopifyProduct[]; href: string }) {
  return <section className="retail-section"><div className="retail-section-heading"><div><h2>{title}</h2>{note && <p>{note}</p>}</div><Link to={href} className="quiet-link">View all</Link></div>{products.length ? <div className="retail-product-grid">{products.slice(0, 4).map((product) => <ProductCard product={product} compact key={product.node.id} />)}</div> : <p className="shelf-empty">This collection is being updated. Explore the catalog for available listings.</p>}</section>;
}
function BrandShelf({ category, title, products }: { category: string; title: string; products: ShopifyProduct[] }) {
  const [brand, setBrand] = useState("");
  const brands = categoryBrands(products, category);
  const selection = categoryProducts(products, category).filter((product) => !brand || product.node.vendor === brand);
  return <section className="retail-section"><div className="retail-section-heading"><h2>{title}</h2><Link to={categoryUrl(category, brand || undefined)} className="quiet-link">View all</Link></div><div className="brand-sorters" role="group" aria-label={`Filter ${category} by brand`}><button type="button" aria-pressed={!brand} onClick={() => setBrand("")}>All brands</button>{brands.map((name) => <button type="button" key={name} aria-pressed={brand === name} onClick={() => setBrand(name)}>{name}</button>)}</div><p className="sr-only" role="status">{selection.length} {category} matching {brand || "all brands"}</p>{selection.length ? <div className="retail-product-grid">{selection.slice(0, 4).map((product) => <ProductCard product={product} compact key={product.node.id} />)}</div> : <p className="shelf-empty">No devices are listed for this brand yet.</p>}</section>;
}
const Index = () => {
  const { data: products = [], isLoading, isError, refetch, isFetching } = useProducts(undefined, 100);
  const deals = DEMO_MODE ? filterCatalog(products, new URLSearchParams("sort=price-asc")).slice(0, 4) : [];
  const arrivals = DEMO_MODE ? ["sample-78", "sample-160", "sample-134", "sample-159"].flatMap((handle) => products.filter((product) => product.node.handle === handle)) : [];
  return <div className="home-page retail-home"><div className="container">
    <PromoCarousel />
    <nav className="category-shortcuts" aria-label="Browse device types">{RETAIL_CATEGORIES.map((category, index) => { const Icon = icons[index]; return <Link key={category.id} to={categoryUrl(category.id)}><span><Icon size={28} strokeWidth={1.4} aria-hidden="true" /></span>{category.label}</Link>; })}</nav>
    {isLoading ? <CatalogState loading /> : isError ? <CatalogState error onRetry={() => refetch()} retrying={isFetching} /> : <>
      <ProductShelf title="Hot deals" note={DEMO_MODE ? "Sample deal selection · illustrative prices" : "Approved offers will appear here."} products={deals} href="/shop?sort=price-asc" />
      <ProductShelf title="New arrivals" note={DEMO_MODE ? "Sample lineup for the new-arrivals collection" : "New listings will appear here once confirmed."} products={arrivals} href="/shop" />
      <div className="brand-promos"><Link to="/shop?category=tablets&brand=Apple" className="brand-promo"><div><span>Apple tablets</span><h2>A lighter way<br />to do more.</h2><p>Explore iPad</p></div><img src="/images/device-159.webp" alt="" width="280" height="280" loading="lazy" /></Link><Link to="/shop?category=laptops&brand=Asus" className="brand-promo"><div><span>ASUS laptops</span><h2>Space for<br />your next idea.</h2><p>Explore ASUS</p></div><img src="/images/device-79.webp" alt="" width="280" height="280" loading="lazy" /></Link></div>
      <BrandShelf title="Find your next phone" category="phones" products={products} />
      <LaptopBrands />
      <ProductShelf title="More ways to work & play" products={products.filter((product) => ["tablets", "audio"].some((category) => categoryProducts([product], category).length))} href="/shop" />
    </>}
    <section className="home-visit"><div><h2>Closer to you.</h2><p>Explore our sample branch directory for Negros.</p></div><Link to="/store" className="quiet-link">Find a branch</Link></section>
  </div></div>;
};
export default Index;
