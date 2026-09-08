import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CatalogState } from "@/components/CatalogState";
import { useProducts } from "@/hooks/useProducts";

const CPO = () => {
  const { data: products = [], isLoading, isError, refetch, isFetching } = useProducts("title:*cpo* OR title:*pre-owned*", 12);
  return (
    <div className="container section-space">
      <header className="mb-10 max-w-2xl"><p className="eyebrow">Pre-owned devices</p><h1 className="text-4xl md:text-5xl">A different way to upgrade.</h1><p className="mt-4 text-lg leading-relaxed text-muted-foreground">Explore available pre-owned units. Condition, included accessories and warranty coverage should be confirmed for each device.</p></header>
      <section aria-label="Pre-owned catalog">
        {isLoading ? <CatalogState loading /> : isError ? <CatalogState error onRetry={() => refetch()} retrying={isFetching} /> : products.length === 0 ? <CatalogState /> : <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.node.id} product={product} />)}</div>}
      </section>
      <section className="section-space" aria-labelledby="condition-title"><div className="section-heading"><div><p className="eyebrow">Before choosing a unit</p><h2 id="condition-title">Know what you’re getting.</h2></div><Link to="/store" className="text-link">Ask a branch <ArrowRight className="h-4 w-4" /></Link></div><dl className="grid gap-x-10 sm:grid-cols-2">{[{ title: "Condition & battery", text: "Request actual unit photos, cosmetic grading and the current battery-health reading where supported." }, { title: "Parts & function", text: "Ask about replacement parts and checks for charging, cameras, speakers, buttons and connectivity." }, { title: "Warranty & returns", text: "Confirm coverage, duration, exclusions and the process if a problem occurs." }, { title: "What comes with it", text: "Check the charger, accessories, storage, network compatibility and any account locks." }].map((item) => <div className="border-t py-6" key={item.title}><dt className="text-lg font-semibold">{item.title}</dt><dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</dd></div>)}</dl></section>
    </div>
  );
};
export default CPO;
