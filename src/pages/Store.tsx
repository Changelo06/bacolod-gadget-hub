import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Tag,
  Sparkles,
  Repeat,
  Handshake,
  Wrench,
  Cable,
  CreditCard,
  Phone,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PROMOS = [
  { tag: "Limited", title: "0% Installment up to 12 months", desc: "On select smartphones and laptops via partner financing." },
  { tag: "Bundle", title: "Free accessories with every new phone", desc: "Case + screen protector + fast charger included." },
  { tag: "Trade-In", title: "Up to ₱20,000 trade-in credit", desc: "Upgrade your phone or laptop and save instantly." },
];

const BRANCHES = [
  { name: "888 Mall · Bacolod", hours: "Mon–Sun · 10:00 AM – 9:00 PM", phone: "(034) 123-4567" },
  { name: "Cadiz City", hours: "Mon–Sun · 9:00 AM – 8:00 PM", phone: "(034) 234-5678" },
  { name: "La Carlota", hours: "Mon–Sun · 9:00 AM – 8:00 PM", phone: "(034) 345-6789" },
  { name: "Dumaguete", hours: "Mon–Sun · 10:00 AM – 9:00 PM", phone: "(035) 456-7890" },
  { name: "Kabankalan", hours: "Mon–Sun · 9:00 AM – 8:00 PM", phone: "(034) 567-8901" },
];

const UPCOMING = [
  { date: "Q2 2026", title: "iWarehouse Iloilo", desc: "Crossing the strait — first branch outside Negros." },
  { date: "Coming Soon", title: "iWarehouse Service Hub", desc: "Dedicated repair & service center in Bacolod." },
  { date: "New Arrivals", title: "Latest flagship lineup", desc: "Pre-order the newest phones, tablets, and laptops." },
];

const PARTNERS = [
  "Apple Authorized Reseller",
  "Samsung",
  "Asus",
  "Lenovo",
  "Acer",
  "HP",
  "Home Credit",
  "Salmon",
  "Skyro",
  "PayJoy",
  "PalmPay",
  "GCash",
];

const SERVICES = [
  { icon: Wrench, t: "Repair Services", d: "Screen, battery, board-level repair for phones & laptops." },
  { icon: Cable, t: "Installations", d: "TV mounting, PC setup, software & accessory install." },
  { icon: ShieldCheck, t: "Device Diagnostics", d: "Free check-up before you buy or trade in." },
  { icon: Repeat, t: "Trade-In Program", d: "Get fair value for your old device toward a new one." },
];

const PAYMENT_OFFERS = [
  { t: "0% Installment", d: "Up to 12 months with Home Credit, Salmon, Skyro." },
  { t: "Buy Now, Pay Later", d: "PayJoy & PalmPay — own your device today." },
  { t: "GCash & Cash", d: "Quick, easy in-store and online payments." },
  { t: "Debit / Credit Card", d: "All major cards accepted." },
];

const QUICK_LINKS = [
  { to: "/shop", label: "Shop all products" },
  { to: "/cpo", label: "Browse CPO devices" },
  { to: "/contact", label: "Contact support" },
  { to: "/shop?q=phone", label: "Phones" },
  { to: "/shop?q=laptop", label: "Laptops" },
  { to: "/shop?q=accessory", label: "Accessories" },
];

const Store = () => {
  return (
    <div>
      {/* HERO */}
      <section className="bg-secondary/60">
        <div className="container py-14 md:py-20 text-center">
          <p className="text-sm font-medium text-accent mb-3">iWarehouse · Updates</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">What's new at iWarehouse.</h1>
          <p className="mt-3 text-lg text-foreground/70 max-w-2xl mx-auto">
            Promos, new branches, trade-ins, partnerships, and services — everything happening across Negros.
          </p>
        </div>
      </section>

      {/* PROMOS */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-accent mb-2">Limited time</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Promos & deals.</h2>
          </div>
          <Button asChild variant="ghost" className="text-accent hover:text-accent">
            <Link to="/shop">Shop deals <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {PROMOS.map((p) => (
            <div key={p.title} className="p-7 rounded-3xl bg-secondary/60 hover:bg-secondary transition-colors">
              <span className="pill bg-background border border-border text-xs mb-4">
                <Tag className="h-3 w-3 text-accent" />
                {p.tag}
              </span>
              <h3 className="text-xl font-semibold mt-3">{p.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORES IN NEGROS */}
      <section className="container py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-medium text-accent mb-2">Stores in Negros</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Five branches, one promise.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANCHES.map((b) => (
            <div key={b.name} className="p-6 rounded-2xl bg-secondary/60">
              <MapPin className="h-5 w-5 text-accent mb-3" strokeWidth={1.75} />
              <p className="font-semibold">{b.name}</p>
              <p className="text-sm text-foreground/70 mt-2 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> {b.hours}
              </p>
              <p className="text-sm text-foreground/70 mt-1 flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" /> {b.phone}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW & UPCOMING */}
      <section className="container py-16">
        <div className="rounded-3xl surface-dark p-10 md:p-14">
          <p className="text-sm font-medium text-orange mb-2">What's next</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-background">New & upcoming.</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {UPCOMING.map((u) => (
              <div key={u.title} className="p-6 rounded-2xl bg-background/10 border border-background/10">
                <Sparkles className="h-5 w-5 text-orange mb-3" />
                <p className="text-xs font-medium text-background/60 uppercase tracking-wide">{u.date}</p>
                <p className="font-semibold mt-1 text-background">{u.title}</p>
                <p className="text-sm text-background/70 mt-2">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRADE-INS */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-10 md:p-14 rounded-3xl bg-secondary/60">
            <Repeat className="h-7 w-7 text-accent mb-4" strokeWidth={1.5} />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Trade-Ins.</h2>
            <p className="mt-3 text-foreground/70">
              Bring in your old phone, laptop, or tablet. Get an instant valuation and apply it directly to your next device.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/80">
              <li>• Free, no-obligation appraisal in any branch</li>
              <li>• Up to ₱20,000 credit on eligible devices</li>
              <li>• Combine with installment for maximum savings</li>
            </ul>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/contact">Start a trade-in</Link>
            </Button>
          </div>
          <div className="p-10 md:p-14 rounded-3xl" style={{ background: "hsl(var(--accent))" }}>
            <Handshake className="h-7 w-7 text-white mb-4" strokeWidth={1.5} />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Partnerships.</h2>
            <p className="mt-3 text-white/85">Authorized partner of the brands and financing providers you trust.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {PARTNERS.map((p) => (
                <span key={p} className="pill bg-white/15 text-white text-xs border border-white/20">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-medium text-accent mb-2">In-store services</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Beyond the sale.</h2>
          <p className="mt-3 text-foreground/70">Repairs, installations, and expert care from our certified technicians.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <div key={s.t} className="p-6 rounded-2xl bg-secondary/60">
              <s.icon className="h-6 w-6 text-accent mb-3" strokeWidth={1.5} />
              <p className="font-semibold">{s.t}</p>
              <p className="text-sm text-foreground/70 mt-2">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PAYMENT OFFERS */}
      <section className="container py-16">
        <div className="rounded-3xl bg-secondary/60 p-10 md:p-14">
          <p className="text-sm font-medium text-accent mb-2">Customer care</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Payment offers built around you.</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PAYMENT_OFFERS.map((o) => (
              <div key={o.t} className="p-5 rounded-2xl bg-background border border-border">
                <CreditCard className="h-5 w-5 text-accent mb-2" />
                <p className="font-semibold">{o.t}</p>
                <p className="text-sm text-muted-foreground mt-1">{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="container py-16">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">Quick links.</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.to + l.label}
              to={l.to}
              className="group flex items-center justify-between p-5 rounded-2xl bg-secondary/60 hover:bg-secondary transition-colors"
            >
              <span className="text-sm font-medium">{l.label}</span>
              <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Store;
