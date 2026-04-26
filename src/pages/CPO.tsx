import { Link } from "react-router-dom";
import { ShieldCheck, BadgeCheck, Recycle, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const PROMISES = [
  { icon: BadgeCheck, title: "Inspected & Certified", desc: "Multi-point quality check on every unit." },
  { icon: ShieldCheck, title: "Warranty Included", desc: "Peace of mind with iWarehouse warranty." },
  { icon: Recycle, title: "Sustainable Choice", desc: "Premium gadgets, second life, big savings." },
  { icon: Award, title: "Negros' CPO Pioneer", desc: "We brought CPO to the region first." },
];

const CPO = () => {
  const { data: products = [], isLoading } = useProducts("title:*cpo* OR title:*pre-owned*", 12);

  return (
    <div>
      {/* HERO */}
      <section className="bg-secondary/60">
        <div className="container py-16 md:py-24 text-center">
          <p className="text-sm font-medium text-accent mb-3">Certified Pre-Owned</p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
            Premium tech.<br /><span className="text-accent">Smarter price.</span>
          </h1>
          <p className="mt-4 text-lg text-foreground/70 max-w-xl mx-auto">
            Fully inspected, warranty-backed smartphones and laptops at a fraction of retail.
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PROMISES.map((p) => (
            <div key={p.title} className="p-6 rounded-2xl bg-secondary/60">
              <p.icon className="h-7 w-7 text-accent mb-3" strokeWidth={1.75} />
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="rounded-3xl surface-dark p-10 md:p-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">Our CPO Quality Checklist</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-background/80">
            {[
              "Battery health verified at 85% or higher",
              "All hardware functions tested",
              "Original or premium replacement parts",
              "Cosmetic grading & honest condition reports",
              "Factory-reset & data-wiped",
              "Backed by iWarehouse warranty",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <BadgeCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Featured CPO.</h2>
          <Button asChild variant="ghost" className="text-accent hover:text-accent">
            <Link to="/shop">All Products <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-3xl bg-secondary/60 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 rounded-3xl bg-secondary/60">
            <p className="font-semibold mb-1">No CPO products yet</p>
            <p className="text-sm text-muted-foreground">Tag products with "CPO" or "Pre-Owned" to feature them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
};

export default CPO;
