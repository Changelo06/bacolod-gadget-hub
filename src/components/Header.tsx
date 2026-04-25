import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { CartDrawer } from "./CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/cpo", label: "CPO Gadgets" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
          <CartDrawer />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <nav className="flex flex-col gap-4 mt-10">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container py-4">
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";

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
          placeholder="Search smartphones, laptops, accessories…"
          className="h-12 text-base"
        />
      </form>
      {q && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-card overflow-hidden">
          {results.map((r) => (
            <Link
              key={r.node.id}
              to={`/product/${r.node.handle}`}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/40 transition-colors"
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
