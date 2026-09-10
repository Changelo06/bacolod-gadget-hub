import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const BRANCHES = [
  { id: "bacolod", name: "888 Mall · Bacolod", query: "888 Mall Bacolod" },
  { id: "cadiz", name: "Cadiz City", query: "Cadiz City Negros Occidental" },
  { id: "la-carlota", name: "La Carlota", query: "La Carlota City Negros Occidental" },
  { id: "dumaguete", name: "Dumaguete", query: "Dumaguete" },
  { id: "kabankalan", name: "Kabankalan", query: "Kabankalan City Negros Occidental" },
];
const Store = () => {
  const [params] = useSearchParams();
  const current = BRANCHES.find((branch) => branch.id === params.get("branch")) ?? BRANCHES[0];
  const mapQuery = encodeURIComponent(current.query);
  return (
    <div className="container section-space">
      <header className="mb-10 max-w-2xl"><p className="eyebrow">iWherehouse · Sample locations</p><h1 className="text-4xl md:text-5xl">Find your branch.</h1><p className="mt-4 text-lg leading-relaxed text-muted-foreground">Explore the branch-finder concept. These locations are illustrative, not operating iWherehouse stores.</p></header>
      <section aria-label="Branch directory" className="grid gap-6 lg:grid-cols-[.8fr_1.6fr]">
        <nav aria-label="Choose a branch" className="divide-y border-y">{BRANCHES.map((branch) => <Link key={branch.id} to={'/store?branch=' + branch.id} aria-current={branch.id === current.id ? "location" : undefined} className={'flex min-h-16 items-center gap-3 px-4 py-5 font-medium ' + (branch.id === current.id ? 'bg-foreground text-background' : 'hover:bg-secondary')}><MapPin className="h-5 w-5 shrink-0" />{branch.name}</Link>)}</nav>
        <div className="min-w-0 overflow-hidden rounded-lg border"><iframe title={current.name + " map search"} src={'https://www.google.com/maps?q=' + mapQuery + '&output=embed'} className="h-72 w-full bg-secondary md:h-80" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="p-6"><h2 className="text-2xl">{current.name}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">This map shows the selected area for the mockup. It does not identify an operating iWherehouse store.</p><a href={'https://www.google.com/maps/search/?api=1&query=' + mapQuery} target="_blank" rel="noopener noreferrer" className="text-link mt-4">View this area on Maps <ArrowUpRight className="h-4 w-4" /></a></div></div>
      </section>
      <section className="section-space" aria-labelledby="services-title"><div className="section-heading"><div><p className="eyebrow">Ask your branch</p><h2 id="services-title">Devices & after-sales help.</h2></div><Link className="text-link" to="/contact">Prepare an inquiry <ArrowUpRight className="h-4 w-4" /></Link></div><div className="grid gap-x-10 sm:grid-cols-2">{[{ title: "Repairs & diagnostics", text: "Describe the device and issue. Ask about assessment fees, parts, turnaround time and repair warranty." }, { title: "Trade-ins", text: "Ask whether your model is eligible and how its condition affects the valuation." }, { title: "Setup & installation", text: "Check which setup or installation services your branch offers and what they cost." }, { title: "Payment options", text: "Confirm accepted methods, financing eligibility, fees and the total payable for your chosen device." }].map((item) => <div className="border-t py-6" key={item.title}><h3 className="text-lg">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div>)}</div></section>
      <section className="flex flex-wrap items-center justify-between gap-6 border-t pt-8"><div><h2 className="text-2xl">Promotions & store updates</h2><p className="mt-3 max-w-xl text-muted-foreground">No verified offers or opening announcements are published in this preview. Ask the branch for current offers and their terms.</p></div><Button asChild variant="outline" className="h-11"><Link to="/shop">Browse devices</Link></Button></section>
    </div>
  );
};
export default Store;
