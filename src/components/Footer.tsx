import { Link } from "react-router-dom";
import { Facebook, MapPin, Phone, Clock } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="border-t border-border mt-24 bg-card/40">
    <div className="container py-14 grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2 space-y-4">
        <Logo />
        <p className="text-sm text-muted-foreground max-w-sm">
          Bacolod City's biggest gadget store. Pioneer in Certified Pre-Owned smartphones, laptops, and tech repairs.
          Trusted by 109,000+ happy customers.
        </p>
        <div className="flex gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="h-10 w-10 rounded-lg bg-secondary/50 hover:bg-primary/20 flex items-center justify-center transition-colors"
          >
            <Facebook className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div>
        <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/shop" className="hover:text-primary">All Products</Link></li>
          <li><Link to="/shop?q=smartphone" className="hover:text-primary">Smartphones</Link></li>
          <li><Link to="/shop?q=laptop" className="hover:text-primary">Laptops</Link></li>
          <li><Link to="/cpo" className="hover:text-primary">CPO Gadgets</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Visit Us</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />Bacolod City, Negros Occidental, Philippines</li>
          <li className="flex gap-2"><Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />+63 900 000 0000</li>
          <li className="flex gap-2"><Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />Mon–Sun · 9:00 AM – 8:00 PM</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container py-5 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} iWarehouse Gadgets, Computers and Repairs.</span>
        <span>Bacolod City, Philippines</span>
      </div>
    </div>
  </footer>
);
