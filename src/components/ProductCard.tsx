import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { productCondition } from "@/lib/catalog";
import { useState } from "react";

export const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const [failed, setFailed] = useState(false);
  const soldOut = !product.node.demo && product.node.variants.edges.length > 0 && !product.node.variants.edges.some(({ node }) => node.availableForSale);
  return <Link to={'/product/' + product.node.handle} className="product-tile group">
    <div className="product-image">{image && !failed ? <img src={image.url} alt={image.altText ?? product.node.title} width="400" height="400" loading="lazy" onError={() => setFailed(true)} /> : <span className="text-sm text-muted-foreground">Photo unavailable</span>}</div>
    <div className="product-info"><div className="product-meta"><span translate="no">{product.node.vendor || "Device"}</span><span>{productCondition(product)}</span></div><h3>{product.node.title}</h3><p className="product-price">{formatPrice(price.amount,price.currencyCode)}</p><div className="product-bottom"><span>{product.node.demo ? "Sample price" : soldOut ? "Currently unavailable" : "Check branch stock"}</span><ArrowUpRight aria-hidden="true" className="h-4 w-4" /></div></div>
  </Link>;
};
