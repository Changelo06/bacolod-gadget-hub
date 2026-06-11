/**
 * File: src/pages/Index.tsx
 * Purpose: Homepage for the iWarehouse storefront.
 * Notes: Highlights featured Shopify products, shopping categories, payment options, and branch locations.
 */
import { Link } from "react-router-dom";
import { ArrowRight, Smartphone, Laptop, Tablet, Headphones, Monitor, Tv, MapPin, CreditCard, Wallet, Banknote, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const CATEGORIES = [
  { icon: Smartphone, label: "Phones", q: "phone" },
  { icon: Laptop, label: "Laptops", q: "laptop" },
  { icon: Tablet, label: "Tablets", q: "tablet" },
  { icon: Monitor, label: "Monitors", q: "monitor" },
  { icon: Tv, label: "TVs", q: "tv" },
  { icon: Headphones, label: "Accessories", q: "accessory OR accessories" },
];

const BRANCHES = [
  "888 Mall - Bacolod",
  "Cadiz City",
  "La Carlota",
  "Dumaguete",
  "Kabankalan",
];

const PAYMENTS = [
  "Cash", "Debit / Credit", "GCash", "Home Credit", "Installment",
  "Salmon", "Skyro", "PayJoy", "PalmPay",
];

const Index = () => {
  const { data: products = [], isLoading } = useProducts(undefined, 8);
  const featured = products[0];

  return (
    <div>
      {/* HERO - product-first like apple.com */}
      <section className="bg-secondary/60">
        <div className="container py-14 md:py-20 text-center">
          <p className="text-sm font-medium text-accent mb-3">New - Now Available</p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
            {featured?.node.title ?? "Technology for everyone."}
          </h1>
          <p className="mt-3 text-lg md:text-xl text-foreground/80">
            {featured ? "Power. Beauty. Built for you." : "Negros' biggest gadget destination."}
          </p>
          <div className="mt-6 flex items-center justify-center gap-5 text-base">
            <Link to="/shop" className="text-accent hover:underline font-medium">
              Shop now <ArrowRight className="inline h-4 w-4" />
            </Link>
            {featured && (
              <Link to={`/product/${featured.node.handle}`} className="text-accent hover:underline font-medium">
                Learn more <ArrowRight className="inline h-4 w-4" />
              </Link>
            )}
          </div>
          {featured?.node.images.edges[0] && (
            <div className="mt-10 mx-auto max-w-3xl">
              <img
                src={featured.node.images.edges[0].node.url}
                alt={featured.node.title}
                className="w-full h-auto object-contain max-h-[480px]"
              />
            </div>
          )}
          {!featured && (
            <div className="mt-10 mx-auto max-w-3xl aspect-[16/10] rounded-3xl bg-background border border-border flex items-center justify-center text-muted-foreground">
              Add your first product to feature it here.
            </div>
          )}
        </div>
      </section>

      {/* SECONDARY HERO TILE - orange accent */}
      <section className="container py-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="surface-dark rounded-3xl p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">CPO Gadgets</h2>
            <p className="mt-2 text-base text-background/70">Premium, certified pre-owned. Smarter price.</p>
            <div className="mt-5 flex items-center justify-center gap-4 text-sm">
              <Link to="/cpo" className="text-orange hover:underline font-medium">Explore CPO <ArrowRight className="inline h-4 w-4" /></Link>
              <Link to="/shop" className="text-background/90 hover:underline font-medium">Shop all <ArrowRight className="inline h-4 w-4" /></Link>
            </div>
          </div>
          <div className="rounded-3xl p-10 md:p-14 text-center" style={{ background: "hsl(var(--accent))" }}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Flexible Payments</h2>
            <p className="mt-2 text-base text-white/85">Cash, GCash, installment & more - your choice.</p>
            <Link to="#payments" className="mt-5 inline-block text-white underline font-medium text-sm">
              See all options
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES - clean Apple-style row */}
      <section className="container py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">Shop by category.</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.label}
              to={`/shop?q=${encodeURIComponent(c.q)}`}
              className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-secondary/60 hover:bg-secondary transition-colors"
            >
              <c.icon className="h-7 w-7 text-foreground group-hover:text-accent transition-colors" strokeWidth={1.5} />
              <span className="text-sm font-medium">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="container py-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">The latest.</h2>
          <Button asChild variant="ghost" className="text-accent hover:text-accent">
            <Link to="/shop">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-3xl bg-secondary/60 animate-pulse" />
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

      {/* PAYMENTS */}
      <section id="payments" className="container py-20">
        <div className="rounded-3xl bg-secondary/60 p-10 md:p-14">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-accent mb-2">Pay your way</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Flexible payment options.</h2>
            <p className="mt-3 text-foreground/70">From cash to installment plans - choose what works for you.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {PAYMENTS.map((p) => (
              <span key={p} className="pill bg-background border border-border text-sm">
                <CreditCard className="h-3.5 w-3.5 text-accent" />
                {p}
              </span>
            ))}
          </div>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Wallet, t: "0% Installment", d: "Available with partner financing." },
              { icon: ShieldCheck, t: "Secure Checkout", d: "Buy online or in-store with confidence." },
              { icon: Banknote, t: "Cash & GCash", d: "Pay with what's easiest for you." },
            ].map((f) => (
              <div key={f.t} className="p-5 rounded-2xl bg-background border border-border">
                <f.icon className="h-5 w-5 text-accent mb-2" />
                <p className="font-semibold">{f.t}</p>
                <p className="text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-medium text-accent mb-2">Across Negros</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Visit a store near you.</h2>
          <p className="mt-3 text-foreground/70">Five branches and growing. Come see, touch, and try the latest tech.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {BRANCHES.map((b) => (
            <div key={b} className="p-6 rounded-2xl bg-secondary/60 text-center">
              <MapPin className="h-5 w-5 text-accent mx-auto mb-2" strokeWidth={1.75} />
              <p className="font-medium text-sm leading-tight">{b}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const EmptyProducts = () => (
  <div className="text-center py-20 rounded-3xl bg-secondary/60">
    <p className="text-lg font-semibold mb-2">No products yet</p>
    <p className="text-muted-foreground text-sm">
      Add your first product to see it featured here.
    </p>
  </div>
);

export default Index;
