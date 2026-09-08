import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CatalogState({ loading = false, error = false, onRetry, retrying = false }: { loading?: boolean; error?: boolean; onRetry?: () => void; retrying?: boolean }) {
  if (loading) return <div role="status" aria-label="Loading devices" className="grid grid-cols-2 gap-4 lg:grid-cols-4"><span className="sr-only">Loading devices…</span>{Array.from({ length: 4 }, (_, i) => <div key={i} className="aspect-[3/4] animate-pulse rounded-lg bg-secondary" />)}</div>;
  return <div role="status" className="rounded-lg border bg-secondary/40 px-6 py-12 text-center"><h3 className="text-xl">{error ? "The catalog couldn’t load." : "No matching devices right now."}</h3><p className="mx-auto mt-3 max-w-md text-muted-foreground">{error ? "Try again, or check with a branch about the device you are looking for." : "Try another search, or ask a branch about availability."}</p><div className="mt-5 flex flex-wrap justify-center gap-3">{error && onRetry && <Button onClick={onRetry} disabled={retrying}>{retrying ? "Try again…" : "Try again"}</Button>}<Button asChild variant="outline"><Link to="/store">Find a branch</Link></Button></div></div>;
}
