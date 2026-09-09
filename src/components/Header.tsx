import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/useProducts";

const NAV = [
  { to: "/shop", label: "Shop devices" },
  { to: "/cpo", label: "Pre-owned" },
  { to: "/store", label: "Our branches" },
  { to: "/contact", label: "Contact" },
];
export const Header = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  return (
    <header className="site-header">
      <div className="container retail-header" data-search-open={searchExpanded}>
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => "header-link" + (isActive ? " is-active" : "")}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div id="header-search" className="header-search"><SearchBar /></div>
        <button
          type="button"
          className="header-search-toggle"
          aria-label={searchExpanded ? "Close search" : "Open search"}
          aria-expanded={searchExpanded}
          aria-controls="header-search"
          onClick={() => setSearchExpanded((value) => !value)}
        >
          {searchExpanded ? <X aria-hidden="true" size={20} /> : <Search aria-hidden="true" size={20} />}
        </button>
      </div>
    </header>
  );
};
function SearchBar() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useEffect(() => { const timer = window.setTimeout(() => setDebounced(query.trim()), 250); return () => window.clearTimeout(timer); }, [query]);
  const { data: results = [], isError, isFetching } = useProducts(debounced ? 'title:*' + debounced + '*' : undefined, 5, !!debounced && open);
  return <div className="search-field" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); input.current?.focus(); } }}>
    <form role="search" onSubmit={(event) => { event.preventDefault(); if (query.trim()) { navigate('/shop?q=' + encodeURIComponent(query.trim())); setOpen(false); input.current?.blur(); } }}>
      <label htmlFor="device-search" className="sr-only">Search devices</label>
      <Input ref={input} id="device-search" name="q" type="search" autoComplete="off" value={query} onFocus={() => setOpen(true)} onChange={(event) => { setQuery(event.target.value); setOpen(true); }} placeholder="Search a brand, device or model…" className="h-11 border-0 bg-transparent pr-12 text-base text-foreground shadow-none" />
      <button type="submit" aria-label="Search catalog" className="search-submit"><Search aria-hidden="true" className="h-5 w-5" /></button>
    </form>
    {open && !!debounced && <div className="search-results">
      <div className="flex items-center justify-between gap-2 px-4 pt-2"><span className="text-xs text-muted-foreground">Matching devices</span><button type="button" aria-label="Close suggestions" onClick={() => { setOpen(false); input.current?.focus(); }} className="flex h-11 w-11 items-center justify-center"><X aria-hidden="true" className="h-4 w-4" /></button></div>
      {isFetching || debounced !== query.trim() ? <p role="status" className="p-4 text-sm">Searching…</p> : isError ? <p role="status" className="p-4 text-sm">Search couldn’t load. Submit your search to try again.</p> : results.length === 0 ? <p role="status" className="p-4 text-sm">No matches. Try another brand or model.</p> : results.map((result) => <Link key={result.node.id} to={'/product/' + result.node.handle} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 px-4 py-3 hover:bg-secondary">{result.node.images.edges[0] && <img src={result.node.images.edges[0].node.url} alt="" width="40" height="40" className="h-10 w-10 object-contain" />}<span className="min-w-0 truncate text-sm font-medium">{result.node.title}</span></Link>)}
    </div>}
  </div>;
}
