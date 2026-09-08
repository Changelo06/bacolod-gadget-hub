import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="bg-black text-white">
    <div className="container py-12">
      <div className="grid gap-8 border-b border-white/20 pb-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div><Logo variant="light" /><p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-400">Phones, laptops and everyday tech.<br />Explore the catalog and plan your visit.</p></div>
        <nav aria-label="Footer shopping links"><h2 className="mb-3 text-sm text-zinc-400">Explore</h2>{[{ to: "/shop", label: "Shop devices" }, { to: "/cpo", label: "Pre-owned devices" }].map((item) => <Link key={item.to} to={item.to} className="flex min-h-11 items-center text-sm hover:underline">{item.label}</Link>)}</nav>
        <nav aria-label="Footer help links"><h2 className="mb-3 text-sm text-zinc-400">Visit & ask</h2>{[{ to: "/store", label: "Branch information" }, { to: "/contact", label: "Contact & inquiries" }].map((item) => <Link key={item.to} to={item.to} className="flex min-h-11 items-center gap-3 text-sm hover:underline">{item.label}<ArrowUpRight className="h-4 w-4" /></Link>)}</nav>
      </div>
      <div className="flex flex-wrap justify-between gap-3 pt-6 text-xs leading-relaxed text-zinc-400"><p>© {new Date().getFullYear()} iWarehouse</p><p>Design proof of concept · Store information requires confirmation.</p></div>
    </div>
  </footer>
);
