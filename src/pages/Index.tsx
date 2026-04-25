import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Wrench, BadgePercent, Trophy, Smartphone, Laptop, Tablet, Headphones, Cpu, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import heroImage from "@/assets/hero-gadgets.jpg";

const CATEGORIES = [
  { icon: Smartphone, label: "Smartphones", q: "smartphone OR phone" },
  { icon: Laptop, label: "Laptops", q: "laptop" },
  { icon: Tablet, label: "Tablets", q: "tablet" },
  { icon: Headphones, label: "Accessories", q: "accessory OR headphone" },
  { icon: Recycle, label: "CPO Gadgets", q: "cpo OR pre-owned" },
  { icon: Cpu, label: "Parts & Repairs", q: "parts OR repair" },
];

const FEATURES = [
  { icon: ShieldCheck, title: "Trusted Store", desc: "Bacolod's go-to gadget destination." },
  { icon: Wrench, title: "Expert Repairs", desc: "Screen, battery, software & more." },
  { icon: BadgePercent, title: "Affordable CPO", desc: "Premium pre-owned, big savings." },
  { icon: Trophy, title: "109K+ Customers", desc: "Loved across Negros & beyond." },
];

const Index = () => {
  const { data: products = [], isLoading } = useProducts(undefined, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImage} alt="" className="w-full h-full object-cover opacity-40" width={1920} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-30 -z-10" />

        <div className="container py-24 md:py-32 lg:py-40 relative">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Bacolod's Biggest Gadget Store
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter">
              Tech that <span className="text-gradient-mint">powers</span><br />
              your everyday.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Smartphones, laptops, tablets and Certified Pre-Owned gadgets. Plus expert repairs — all under one roof.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-gradient-mint text-primary-foreground hover:opacity-90 font-semibold">
                <Link to="/shop">Shop Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 hover:bg-primary/10">
                <Link to="/cpo">Explore CPO</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">Find what you need, fast.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.label}
              to={`/shop?q=${encodeURIComponent(c.q)}`}
              className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-border bg-gradient-card glow-hover"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                <c.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-center">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="p-6 rounded-xl bg-secondary/40 border border-border">
              <f.icon className="h-7 w-7 text-primary mb-3" />
              <h3 className="font-display font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="container py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Latest Arrivals</h2>
            <p className="text-muted-foreground mt-2">Fresh drops from your favorite brands.</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex hover:text-primary">
            <Link to="/shop">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-xl bg-secondary/40 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyProducts />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="rounded-2xl bg-gradient-hero border border-primary/20 p-10 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Need a repair? We've got you.</h2>
            <p className="text-muted-foreground mb-6">Screen replacement, battery swap, data recovery, software fixes — fast turnaround in Bacolod.</p>
            <Button asChild size="lg" className="bg-gradient-mint text-primary-foreground hover:opacity-90 font-semibold">
              <Link to="/contact">Request a Repair</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const EmptyProducts = () => (
  <div className="text-center py-20 border border-dashed border-border rounded-xl">
    <p className="text-lg font-display font-semibold mb-2">No products yet</p>
    <p className="text-muted-foreground text-sm">
      Tell the chat what to add — e.g. "iPhone 15 Pro · ₱65,000".
    </p>
  </div>
);

export default Index;
