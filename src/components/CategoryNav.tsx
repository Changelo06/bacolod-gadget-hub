import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { useProducts } from "@/hooks/useProducts";
import { categoryBrands, categoryUrl, RETAIL_CATEGORIES } from "@/lib/retail";
import { DEMO_MODE } from "@/lib/catalog";

const previewBrands: Record<string, string[]> = {
  monitors: ["Asus", "Samsung", "LG", "Dell"],
  pcs: ["Asus", "Lenovo", "HP", "Acer"],
  peripherals: ["Logitech", "Razer", "Corsair", "Asus"],
};

export function CategoryNav() {
  const { data: products = [], isLoading, isError } = useProducts(undefined, 100);
  return <div className="category-bar"><nav className="container category-navigation" aria-label="Shop by category">
    {RETAIL_CATEGORIES.map((category) => {
      const listedBrands = categoryBrands(products, category.id);
      const brands = listedBrands.length ? listedBrands : DEMO_MODE ? previewBrands[category.id] ?? [] : [];
      return <DropdownMenu key={category.id} modal={false}>
        <DropdownMenuTrigger className="category-trigger">{category.label}<ChevronDown size={13} aria-hidden="true" /></DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={8} className="category-dropdown">
          <DropdownMenuItem asChild><Link to={categoryUrl(category.id)}>View all {category.label.toLowerCase()}</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          {DEMO_MODE && listedBrands.length === 0 && brands.length > 0 && <p className="category-unavailable">Sample brand directory · products coming soon</p>}
          {brands.map((brand) => <DropdownMenuItem asChild key={brand}><Link to={categoryUrl(category.id, brand)}>{brand}</Link></DropdownMenuItem>)}
          {brands.length === 0 && <p className="category-unavailable">{isLoading ? "Loading brands…" : isError ? "Brands could not load." : "Brand listings coming soon."}</p>}
          {category.id === "others" && <><DropdownMenuSeparator /><DropdownMenuItem asChild><Link to="/shop?category=audio">Audio</Link></DropdownMenuItem><DropdownMenuItem asChild><Link to="/shop?category=accessories">Accessories</Link></DropdownMenuItem></>}
        </DropdownMenuContent>
      </DropdownMenu>;
    })}
  </nav></div>;
}
