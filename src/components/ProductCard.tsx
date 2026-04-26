import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";

export const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const isCPO = /cpo|pre-?owned/i.test(product.node.title) || /cpo|pre-?owned/i.test(product.node.description);

  return (
    <Link
      to={`/product/${product.node.handle}`}
      className="group product-tile rounded-3xl bg-secondary/60 overflow-hidden flex flex-col"
    >
      <div className="aspect-square relative overflow-hidden p-6">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.node.title}
            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
            No image
          </div>
        )}
        {isCPO && (
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0 font-semibold rounded-full px-3">
            CPO
          </Badge>
        )}
        {variant && !variant.availableForSale && (
          <Badge variant="destructive" className="absolute top-4 right-4 rounded-full">Sold out</Badge>
        )}
      </div>
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-accent transition-colors">
          {product.node.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">From {formatPrice(price.amount, price.currencyCode)}</p>
      </div>
    </Link>
  );
};
