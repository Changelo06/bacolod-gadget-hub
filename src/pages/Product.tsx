import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductByHandle } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/shopify";
import { productCondition } from "@/lib/catalog";
import { CatalogState } from "@/components/CatalogState";

const Product = () => {
  const {handle} = useParams<{handle:string}>();
  const [params,setParams] = useSearchParams();
  const {data:product,isLoading,isError,isFetching,refetch} = useProductByHandle(handle);
  if(isLoading) return <div className="container section-space"><CatalogState loading /></div>;
  if(isError) return <div className="container section-space"><CatalogState error onRetry={()=>refetch()} retrying={isFetching} /></div>;
  if(!product) return <div className="container section-space"><h1 className="text-3xl">Device not found.</h1><Button asChild variant="outline" className="mt-6"><Link to="/shop">Back to devices</Link></Button></div>;
  const variants=product.variants.edges;
  const variant=variants.find(({node})=>node.id===params.get("variant"))?.node ?? variants[0]?.node;
  const imageIndex=Math.max(0,Number.parseInt(params.get("image") ?? "0",10)||0);
  const image=product.images.edges[imageIndex]?.node ?? product.images.edges[0]?.node;
  const price=variant?.price ?? product.priceRange.minVariantPrice;
  const inquiry=new URLSearchParams({product:product.title});
  if(variant && variant.title!=="Default Title") inquiry.set("option",variant.title);
  return <div className="container section-space">
    <Link to="/shop" className="text-link mb-6"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Back to devices</Link>
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
      <div><div className="product-detail-image">{image ? <img src={image.url} alt={image.altText ?? product.title} width="700" height="700" {...{ fetchpriority: "high" }} /> : <p>Photo unavailable</p>}</div>{product.images.edges.length>1 && <div className="mt-4 flex flex-wrap gap-3">{product.images.edges.map((img,i)=><button key={img.node.url} type="button" aria-label={'View photo ' + (i+1)} aria-pressed={i===imageIndex} onClick={()=>{const next=new URLSearchParams(params);next.set("image",String(i));setParams(next,{replace:true});}} className={'h-16 w-16 rounded-md border p-2 ' + (i===imageIndex ? 'border-primary':'border-border')}><img src={img.node.url} alt="" width="64" height="64" loading="lazy" className="h-full w-full object-contain" /></button>)}</div>}</div>
      <div><div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground"><span translate="no">{product.vendor}</span><span>{productCondition({node:product})}</span></div><h1 className="text-3xl md:text-4xl">{product.title}</h1><p className="mt-6 text-3xl font-extrabold tabular-nums">{formatPrice(price.amount,price.currencyCode)}</p><p className="mt-2 text-sm text-muted-foreground">{product.demo ? "Illustrative price for this design preview." : "Listed device price. Confirm the final price with your branch."}</p>
      {variants.length>1 && <label className="mt-6 grid gap-2 text-sm font-semibold">Choose an option<select value={variant?.id} onChange={(event)=>{const next=new URLSearchParams(params);next.set("variant",event.target.value);setParams(next);}}>{variants.map(({node})=><option key={node.id} value={node.id}>{node.title}{!node.availableForSale && !product.demo ? " · unavailable":""}</option>)}</select></label>}
      <div className="my-6 rounded-md bg-secondary p-4 text-sm leading-relaxed">{product.demo ? "Sample device only. This listing does not confirm iWarehouse stock, specifications or a sales offer." : variant?.availableForSale ? "Ask your preferred branch about stock before visiting." : "This option is currently unavailable. Ask a branch about alternatives."}</div>
      <Button asChild size="lg" className="primary-action"><Link to={'/contact?' + inquiry}>Ask about this device <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></Button>
      <div className="mt-8 border-t pt-6"><h2 className="text-lg">Before you decide</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Confirm storage, colour, included accessories, warranty and payment terms. For installments, ask for the down payment, monthly amount, number of months and total payable.</p></div>
      {product.description && <div className="mt-6"><h2 className="text-lg">About this device</h2><p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{product.description}</p></div>}
      </div>
    </div>
  </div>;
};
export default Product;
