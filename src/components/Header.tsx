import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { CartDrawer } from "./CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useProducts } from "@/hooks/useProducts";

const NAV = [
  { to: "/shop?q=phone", label: "Phones" },
  { to: "/shop?q=laptop", label: "Laptops" },
  { to: "/shop?q=pc OR desktop", label: "PCs" },
  { to: "/shop?q=monitor", label: "Monitors" },
  { to: "/shop?q=tv", label: "TVs" },
  { to: "/shop?q=accessory OR accessories", label: "Accessories" },
  { to: "/cpo", label: "CPO" },
  { to: "/contact", label: "Support" },
];

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

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-[13px] font-medium text-foreground/80 hover:text-foreground transition-colors"
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
          <CartDrawer />
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
                    {item.label}
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
          placeholder="Search iPhone, MacBook, accessories…"
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
