import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CatalogState } from "@/components/CatalogState";
import { useProducts } from "@/hooks/useProducts";
import { catalogCategory } from "@/lib/catalog";

const Index = () => {
  const { data: products = [], isLoading, isError, refetch, isFetching } = useProducts(undefined, 100);
  const featured = ["phones", "laptops", "tablets", "audio"]
    .map((category) => products.find((product) => catalogCategory(product) === category))
    .filter((product) => product !== undefined);
  const heroImage = products.find((product) => catalogCategory(product) === "laptops")?.node.images.edges[0]?.node;

  return (
    <div className="home-page">
      <section className="container home-welcome">
        <div className="welcome-copy">
          <h1>Technology<br />for everyone.</h1>
          <p>Phones, laptops and everyday essentials.</p>
          <Button asChild size="lg" className="welcome-action">
            <Link to="/shop">Browse devices</Link>
          </Button>
        </div>
        {heroImage && (
          <div className="welcome-image">
            <img src={heroImage.url} alt="A laptop from the sample device collection" width="600" height="600" {...{ fetchpriority: "high" }} />
          </div>
        )}
      </section>

      <section className="container home-collection" aria-labelledby="collection-title">
        <div className="collection-heading">
          <h2 id="collection-title">Find your everyday.</h2>
          <Link to="/shop" className="quiet-link">View collection</Link>
        </div>
        {isLoading ? <CatalogState loading /> : isError ? (
          <CatalogState error onRetry={() => refetch()} retrying={isFetching} />
        ) : featured.length === 0 ? <CatalogState /> : (
          <div className="home-product-grid">
            {featured.map((product) => <ProductCard key={product.node.id} product={product} compact />)}
          </div>
        )}
      </section>

      <section className="container home-visit" aria-labelledby="visit-title">
        <div>
          <h2 id="visit-title">Closer to you.</h2>
          <p>Visit an iWarehouse branch in Negros.</p>
        </div>
        <Link to="/store" className="quiet-link">Find a branch</Link>
      </section>
    </div>
  );
};
export default Index;
