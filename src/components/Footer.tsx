import { Link } from "react-router-dom";
import { Facebook, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";

const BRANCHES = [
  "888 Mall, Bacolod",
  "Cadiz City",
  "La Carlota",
  "Dumaguete",
  "Kabankalan",
];

const PAYMENTS = [
  "Cash", "Debit/Credit", "GCash", "Home Credit",
  "Installment", "Salmon", "Skyro", "PayJoy", "PalmPay",
];

export const Footer = () => (
  <footer className="surface-dark mt-20">
    <div className="container py-14 grid gap-10 md:grid-cols-4 text-sm">
      <div className="md:col-span-2 space-y-4">
        <Logo variant="light" />
        <p className="text-background/70 max-w-sm leading-relaxed">
          Making technology available for everyone. Negros' trusted destination for gadgets, computers and repairs.
        </p>
        <div className="flex gap-2 pt-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
             className="h-9 w-9 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="https://m.me/iwarehouse" target="_blank" rel="noopener noreferrer" aria-label="Messenger"
             className="h-9 w-9 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors">
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4 text-background">Branches</h4>
        <ul className="space-y-2 text-background/70">
          {BRANCHES.map((b) => (
            <li key={b} className="flex gap-2"><MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />{b}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4 text-background">Payment Options</h4>
        <div className="flex flex-wrap gap-1.5">
          {PAYMENTS.map((p) => (
            <span key={p} className="pill bg-background/10 text-background/80 text-[11px]">{p}</span>
          ))}
        </div>
        <ul className="mt-5 space-y-2 text-background/70">
          <li className="flex gap-2"><Phone className="h-4 w-4 text-accent shrink-0 mt-0.5" />+63 900 000 0000</li>
          <li className="flex gap-2"><Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />Mon–Sun · 9AM–8PM</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-background/10">
      <div className="container py-5 text-xs text-background/60 flex flex-wrap items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} iWarehouse. Making technology available for everyone.</span>
        <div className="flex gap-4">
          <Link to="/shop" className="hover:text-background">Shop</Link>
          <Link to="/cpo" className="hover:text-background">CPO</Link>
          <Link to="/contact" className="hover:text-background">Support</Link>
        </div>
      </div>
    </div>
  </footer>
);
