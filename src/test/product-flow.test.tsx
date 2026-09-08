import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Product from "@/pages/Product";
import Contact from "@/pages/Contact";
import samples from "@/data/sample-products.json";
vi.mock("@/hooks/useProducts", () => ({
  useProductByHandle: () => ({ data: {
    ...samples[0].node,
    variants: {edges:[
      {node:{id:"black",title:"Black / 128GB",price:{amount:"7990",currencyCode:"PHP"},availableForSale:true,selectedOptions:[]}},
      {node:{id:"blue",title:"Blue / 256GB",price:{amount:"9990",currencyCode:"PHP"},availableForSale:true,selectedOptions:[]}}
    ]}
  }, isLoading:false,isError:false,isFetching:false,refetch:vi.fn() })
}));
afterEach(cleanup);
describe("Product inquiry handoff",()=>{
  it("updates the selected price and carries the full variant into the inquiry",()=>{
    render(<MemoryRouter initialEntries={["/product/sample-125"]}><Routes><Route path="/product/:handle" element={<Product />} /><Route path="/contact" element={<Contact />} /></Routes></MemoryRouter>);
    fireEvent.change(screen.getByLabelText("Choose an option"),{target:{value:"blue"}});
    expect(screen.getByText("₱9,990.00")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link",{name:"Ask about this device"}));
    expect((screen.getByLabelText("Device or service inquiry") as HTMLTextAreaElement).value).toContain("Blue / 256GB");
    expect((screen.getByLabelText("Device or service inquiry") as HTMLTextAreaElement).value).toContain("Oppo A57");
  });
});
