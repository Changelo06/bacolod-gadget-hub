import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const isCPO = /cpo|pre-?owned/i.test(product.node.title) || /cpo|pre-?owned/i.test(product.node.description);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", {
      description: product.node.title,
      position: "top-center",
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-gradient-card shadow-card glow-hover">
      <Link to={`/product/${product.node.handle}`} className="block">
        <div className="aspect-square relative bg-secondary/30 overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.altText ?? product.node.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
              No image
            </div>
          )}
          {isCPO && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border-0 font-semibold">
              CPO
            </Badge>
          )}
          {variant && !variant.availableForSale && (
            <Badge variant="destructive" className="absolute top-3 right-3">Sold out</Badge>
          )}
        </div>
        <div className="p-4 space-y-1">
          <h3 className="font-display font-semibold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.node.title}
          </h3>
          <p className="text-lg font-bold text-primary">{formatPrice(price.amount, price.currencyCode)}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button
          onClick={handleAdd}
          disabled={isLoading || !variant?.availableForSale}
          className="w-full bg-gradient-mint text-primary-foreground hover:opacity-90 font-semibold"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};
