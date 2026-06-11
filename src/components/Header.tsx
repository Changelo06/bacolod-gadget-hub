/**
 * File: src/components/Header.tsx
 * Purpose: Site-wide navigation header with product category links, mobile menu, and Shopify-backed search.
 * Notes: Coordinates route navigation and lightweight autocomplete for the storefront.
 */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useProducts } from "@/hooks/useProducts";

const NAV_PRODUCTS = [
  { to: "/store", label: "Store" },
  { to: "/shop?q=phone", label: "Phones" },
  { to: "/shop?q=laptop", label: "Laptops" },
  { to: "/shop?q=pc OR desktop", label: "PCs" },
  { to: "/shop?q=monitor", label: "Monitors" },
  { to: "/shop?q=tv", label: "TVs" },
  { to: "/shop?q=accessory OR accessories", label: "Accessories" },
  { to: "/cpo", label: "CPO", verified: true },
];

const NAV_SERVICES = [
  { to: "/contact", label: "Support" },
];

const NAV = [...NAV_PRODUCTS, ...NAV_SERVICES];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="container flex h-[68px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
          {NAV_PRODUCTS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-[13px] font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.verified ? <CpoLabel /> : item.label}
            </Link>
          ))}
        </nav>

        <nav className="hidden md:flex items-center gap-5 mr-2">
          {NAV_SERVICES.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-[13px] font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            className="h-9 w-9"
          >
            {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" aria-label="Menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <nav className="flex flex-col gap-1 mt-10">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="text-lg font-medium py-2 hover:text-accent transition-colors"
                  >
                    {item.verified ? <CpoLabel /> : item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container py-5">
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

const CpoLabel = () => (
  <span className="inline-flex items-baseline">
    CP
    <span className="relative inline-block">
      <span
        className="absolute -right-1.5 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-background"
        aria-hidden="true"
      >
        <Check className="h-2.5 w-2.5" strokeWidth={3} />
      </span>
      O
    </span>
  </span>
);

const SearchBar = ({ onClose }: { onClose: () => void }) => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { data: results = [] } = useProducts(q ? `title:*${q}*` : undefined, 6);

  return (
    <div className="relative max-w-2xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) {
            navigate(`/shop?q=${encodeURIComponent(q)}`);
            onClose();
          }
        }}
      >
        <Input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search phones, laptops, accessories..."
          className="h-12 text-base rounded-full border-border bg-secondary/60 px-5"
        />
      </form>
      {q && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
          {results.map((r) => (
            <Link
              key={r.node.id}
              to={`/product/${r.node.handle}`}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
            >
              {r.node.images.edges[0] && (
                <img src={r.node.images.edges[0].node.url} alt="" className="h-10 w-10 rounded object-cover" />
              )}
              <span className="text-sm font-medium flex-1 truncate">{r.node.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
