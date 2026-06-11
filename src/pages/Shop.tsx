/**
 * File: src/pages/Shop.tsx
 * Purpose: Product listing page with search, sorting, and device category shortcuts.
 * Notes: Uses Shopify title queries to filter catalog results and route customers into common device groups.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  BatteryCharging,
  Camera,
  Cpu,
  Gamepad2,
  HardDrive,
  Headphones,
  Keyboard,
  Laptop,
  Monitor,
  Mouse,
  Smartphone,
  Speaker,
  Tablet,
  Tv,
  Watch,
  Wifi,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyProducts } from "./Index";

const DEVICE_CATEGORIES = [
  {
    icon: Smartphone,
    label: "Phones",
    q: "phone",
    title: "Phones built around your day.",
    description: "Browse pocket-ready devices for photos, games, school, work, and everyday connection.",
    eyebrow: "Mobile devices",
    surface: "bg-orange-50",
    accent: "text-accent",
    ring: "ring-accent/20",
    features: [
      { icon: Camera, title: "Camera ready", description: "Compare phones for portraits, reels, and clear daily shots." },
      { icon: BatteryCharging, title: "All-day power", description: "Look for battery life, charging speed, and storage fit." },
      { icon: Wifi, title: "Always connected", description: "Find models ready for calls, browsing, streaming, and apps." },
    ],
  },
  {
    icon: Laptop,
    label: "Laptops",
    q: "laptop",
    title: "Laptops for work, class, and creation.",
    description: "Find portable machines for productivity, online classes, design work, and everyday multitasking.",
    eyebrow: "Portable computing",
    surface: "bg-sky-50",
    accent: "text-sky-600",
    ring: "ring-sky-200",
    features: [
      { icon: Cpu, title: "Performance first", description: "Balance processors, memory, and storage for your workload." },
      { icon: BatteryCharging, title: "Travel friendly", description: "Choose practical battery life and a comfortable carry size." },
      { icon: HardDrive, title: "Storage options", description: "Match SSD capacity to apps, files, photos, and projects." },
    ],
  },
  {
    icon: Tablet,
    label: "Tablets",
    q: "tablet",
    title: "Tablets for streaming, notes, and light work.",
    description: "Explore touch-first devices for media, reading, school notes, and easy browsing.",
    eyebrow: "Touchscreen essentials",
    surface: "bg-emerald-50",
    accent: "text-emerald-600",
    ring: "ring-emerald-200",
    features: [
      { icon: Watch, title: "Easy to carry", description: "Great for couch browsing, travel, and quick daily tasks." },
      { icon: Speaker, title: "Media focused", description: "Compare screen size, speakers, and display quality." },
      { icon: BatteryCharging, title: "Long sessions", description: "Pick battery life that fits study, streaming, or business use." },
    ],
  },
  {
    icon: Monitor,
    label: "PCs",
    q: "pc OR desktop",
    title: "Desktop setups with room to grow.",
    description: "Shop PC systems and desktop-ready gear for gaming, office work, editing, and home setups.",
    eyebrow: "Desktop power",
    surface: "bg-zinc-100",
    accent: "text-zinc-800",
    ring: "ring-zinc-300",
    features: [
      { icon: Cpu, title: "Upgrade path", description: "Choose systems with the performance headroom you need." },
      { icon: Gamepad2, title: "Gaming capable", description: "Look for graphics, cooling, and display compatibility." },
      { icon: Keyboard, title: "Setup ready", description: "Pair desktops with monitors, keyboards, and accessories." },
    ],
  },
  {
    icon: Monitor,
    label: "Monitors",
    q: "monitor",
    title: "Monitors that make every setup clearer.",
    description: "Find screens for productivity, gaming, entertainment, and multi-device desks.",
    eyebrow: "Display upgrades",
    surface: "bg-indigo-50",
    accent: "text-indigo-600",
    ring: "ring-indigo-200",
    features: [
      { icon: Monitor, title: "Right size", description: "Match screen size and resolution to your desk and workflow." },
      { icon: Gamepad2, title: "Smooth play", description: "Check refresh rate and response time for gaming setups." },
      { icon: Wifi, title: "Easy pairing", description: "Consider HDMI, USB-C, and device compatibility." },
    ],
  },
  {
    icon: Tv,
    label: "TVs",
    q: "tv",
    title: "TVs for bigger nights in.",
    description: "Browse large-screen options for movies, shows, sports, gaming, and family entertainment.",
    eyebrow: "Home entertainment",
    surface: "bg-rose-50",
    accent: "text-rose-600",
    ring: "ring-rose-200",
    features: [
      { icon: Tv, title: "Screen presence", description: "Choose a size that fits your viewing distance and room." },
      { icon: Speaker, title: "Immersive sound", description: "Pair with audio gear for a fuller entertainment setup." },
      { icon: Gamepad2, title: "Console ready", description: "Look for ports and display features that support gaming." },
    ],
  },
  {
    icon: Headphones,
    label: "Accessories",
    q: "accessory OR accessories",
    title: "Accessories that complete the setup.",
    description: "Find audio, chargers, keyboards, mice, cases, and daily add-ons for your devices.",
    eyebrow: "Everyday add-ons",
    surface: "bg-amber-50",
    accent: "text-amber-700",
    ring: "ring-amber-200",
    features: [
      { icon: Headphones, title: "Audio upgrades", description: "Pick headphones, speakers, and gear for calls or music." },
      { icon: Mouse, title: "Desk essentials", description: "Round out a laptop or PC setup with practical controls." },
      { icon: BatteryCharging, title: "Power ready", description: "Keep chargers, cables, and backup power within reach." },
    ],
  },
];

function toShopifyTitleQuery(value: string) {
  const terms = value
    .split(/\s+OR\s+/i)
    .map((term) => term.trim())
    .filter(Boolean);

  if (terms.length > 1) return terms.map((term) => `title:*${term}*`).join(" OR ");
  return value.trim() ? `title:*${value.trim()}*` : undefined;
}

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const [sort, setSort] = useState<string>("featured");

  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [params]);

  const activeCategory = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return DEVICE_CATEGORIES.find((category) => category.q.toLowerCase() === normalized);
  }, [query]);
  const shopifyQuery = useMemo(() => toShopifyTitleQuery(query), [query]);
  const { data: products = [], isLoading } = useProducts(shopifyQuery, 48);

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "price-asc") {
      list.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
    } else if (sort === "price-desc") {
      list.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
    } else if (sort === "title") {
      list.sort((a, b) => a.node.title.localeCompare(b.node.title));
    }
    return list;
  }, [products, sort]);

  return (
    <div>
      <CategoryHero activeCategory={activeCategory} />

      <div className="container py-10 md:py-12">
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {DEVICE_CATEGORIES.map((category) => {
            const isActive = activeCategory?.label === category.label;
            return (
              <Link
                key={category.label}
                to={`/shop?q=${encodeURIComponent(category.q)}`}
                onClick={() => setQuery(category.q)}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors ${
                  isActive ? "bg-foreground text-background" : "bg-secondary/60 hover:bg-secondary"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    isActive ? "bg-background/15 text-background" : "bg-background text-accent"
                  }`}
                >
                  <category.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className={`text-sm font-medium leading-tight transition-colors ${isActive ? "" : "group-hover:text-accent"}`}>
                  {category.label}
                </span>
              </Link>
            );
          })}
        </div>

        {activeCategory && (
          <div className="mb-8 grid md:grid-cols-3 gap-4">
            {activeCategory.features.map((feature) => (
              <div key={feature.title} className="rounded-2xl bg-secondary/60 p-5">
                <feature.icon className={`mb-3 h-5 w-5 ${activeCategory.accent}`} strokeWidth={1.75} />
                <h2 className="text-base font-semibold">{feature.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              const next = new URLSearchParams(params);
              if (e.target.value) next.set("q", e.target.value);
              else next.delete("q");
              setParams(next, { replace: true });
            }}
            placeholder={activeCategory ? `Search ${activeCategory.label.toLowerCase()}...` : "Search products..."}
            className="h-11 max-w-md rounded-full bg-secondary/60 px-5"
          />
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-11 w-full sm:w-48 rounded-full bg-secondary/60 px-5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="title">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-3xl bg-secondary/60 animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <EmptyProducts />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sorted.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryHero = ({ activeCategory }: { activeCategory?: (typeof DEVICE_CATEGORIES)[number] }) => {
  const category = activeCategory ?? {
    icon: Smartphone,
    title: "Shop the right tech for your setup.",
    description: "Smartphones, laptops, tablets, accessories, displays, TVs, and desktop gear in one place.",
    eyebrow: "iWarehouse catalog",
    surface: "bg-secondary/60",
    accent: "text-accent",
    ring: "ring-border",
    features: [],
  };
  const Icon = category.icon;

  return (
    <section className={`${category.surface} border-b border-border`}>
      <div className="container grid lg:grid-cols-[1fr_420px] gap-8 py-12 md:py-16 items-center">
        <div>
          <p className={`mb-3 text-sm font-medium ${category.accent}`}>{category.eyebrow}</p>
          <h1 className="max-w-3xl text-4xl md:text-6xl font-semibold tracking-tight">{category.title}</h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/70">
            {category.description}
          </p>
        </div>

        <div className="relative min-h-[260px]">
          <div className={`absolute inset-6 rounded-[2rem] bg-background shadow-soft ring-1 ${category.ring}`} />
          <div className="absolute inset-x-12 top-10 h-6 rounded-full bg-foreground/10" />
          <div className="relative mx-auto flex h-[260px] max-w-[320px] items-center justify-center">
            <div className={`flex h-36 w-36 items-center justify-center rounded-[2rem] bg-secondary ${category.accent}`}>
              <Icon className="h-20 w-20" strokeWidth={1.35} />
            </div>
          </div>
          <div className="absolute bottom-9 left-10 h-12 w-12 rounded-full bg-background shadow-card" />
          <div className="absolute bottom-10 right-12 h-16 w-24 rounded-2xl bg-foreground/90" />
        </div>
      </div>
    </section>
  );
};

export default Shop;
