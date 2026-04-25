import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export const Logo = () => (
  <Link to="/" className="flex items-center gap-2 group">
    <div className="relative">
      <div className="absolute inset-0 bg-primary/30 blur-md rounded-lg group-hover:bg-primary/50 transition-colors" />
      <div className="relative h-9 w-9 rounded-lg bg-gradient-mint flex items-center justify-center">
        <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-display font-bold text-lg tracking-tight">
        i<span className="text-gradient-mint">Warehouse</span>
      </span>
      <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase hidden sm:block">
        Bacolod's Biggest Gadget Store
      </span>
    </div>
  </Link>
);
