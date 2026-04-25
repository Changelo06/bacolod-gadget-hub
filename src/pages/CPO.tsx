import { Link } from "react-router-dom";
import { ShieldCheck, BadgeCheck, Recycle, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import cpoImage from "@/assets/cpo-banner.jpg";

const PROMISES = [
  { icon: BadgeCheck, title: "Inspected & Certified", desc: "Every CPO unit passes a multi-point quality check." },
  { icon: ShieldCheck, title: "Warranty Included", desc: "Peace of mind with our in-store CPO warranty." },
  { icon: Recycle, title: "Sustainable Choice", desc: "Give premium gadgets a second life — and save." },
  { icon: Award, title: "Bacolod's CPO Pioneer", desc: "We brought Certified Pre-Owned to Negros first." },
];

const CPO = () => {
  const { data: products = [], isLoading } = useProducts("title:*cpo* OR title:*pre-owned*", 12);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img src={cpoImage} alt="" className="w-full h-full object-cover opacity-30" loading="lazy" width={1600} height={900} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        </div>
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent mb-6">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Certified Pre-Owned
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter mb-5">
              Premium tech.<br />
              <span className="text-gradient-mint">Smarter price.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Our Certified Pre-Owned program brings you fully inspected, warranty-backed smartphones and laptops at a fraction of the retail price.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROMISES.map((p) => (
            <div key={p.title} className="p-6 rounded-xl bg-gradient-card border border-border">
              <p.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-display font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="rounded-2xl bg-gradient-hero border border-primary/20 p-10 md:p-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our CPO Quality Checklist</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground">
            {[
              "Battery health verified at 85% or higher",
              "All hardware functions tested",
              "Original or premium replacement parts",
              "Cosmetic grading & honest condition reports",
              "Factory-reset & data-wiped",
              "Backed by iWarehouse warranty",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <BadgeCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Featured CPO Gadgets</h2>
            <p className="text-muted-foreground mt-2">Hand-picked deals on certified pre-owned tech.</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex hover:text-primary">
            <Link to="/shop">All Products <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-xl bg-secondary/40 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-xl">
            <p className="font-display font-semibold mb-1">No CPO products yet</p>
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
