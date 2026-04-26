import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProductByHandle } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { toast } from "sonner";

const Product = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProductByHandle(handle);
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
  const [activeImage, setActiveImage] = useState(0);
  const [variantId, setVariantId] = useState<string | null>(null);

  const variant = useMemo(() => {
    if (!product) return null;
    const variants = product.variants.edges;
    return (variants.find((v) => v.node.id === variantId) ?? variants[0])?.node ?? null;
  }, [product, variantId]);

  if (isLoading) {
    return (
      <div className="container py-20 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-3">Product not found</h1>
        <Button asChild variant="outline"><Link to="/shop">Back to Shop</Link></Button>
      </div>
    );
  }

  const images = product.images.edges;
  const image = images[activeImage]?.node ?? images[0]?.node;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title, position: "top-center" });
  };

  return (
    <div className="container py-10 md:py-14">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-3">
          <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/60 p-6">
            {image && <img src={image.url} alt={image.altText ?? product.title} className="w-full h-full object-contain" />}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 bg-secondary/60 p-2 ${i === activeImage ? "border-accent" : "border-transparent"}`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{product.title}</h1>
            <p className="text-2xl font-semibold mt-3">
              {variant ? formatPrice(variant.price.amount, variant.price.currencyCode) : ""}
            </p>
            {variant && !variant.availableForSale && <Badge variant="destructive" className="mt-2">Sold out</Badge>}
          </div>

          {product.options
            .filter((o) => o.name.toLowerCase() !== "title" || o.values.length > 1)
            .map((opt) => (
              <div key={opt.name}>
                <p className="text-sm font-medium mb-2">{opt.name}</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges
                    .filter((v) => v.node.selectedOptions.some((s) => s.name === opt.name))
                    .map((v) => {
                      const so = v.node.selectedOptions.find((s) => s.name === opt.name);
                      const isActive = (variant?.id ?? product.variants.edges[0].node.id) === v.node.id;
                      return (
                        <button
                          key={v.node.id}
                          onClick={() => setVariantId(v.node.id)}
                          className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                            isActive ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/50"
                          }`}
                        >
                          {so?.value}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}

          <Button
            onClick={handleAdd}
            disabled={cartLoading || !variant?.availableForSale}
            size="lg"
            className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 font-medium rounded-full px-8"
          >
            {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Bag"}
          </Button>

          {product.description && (
            <div className="pt-6 border-t border-border">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
