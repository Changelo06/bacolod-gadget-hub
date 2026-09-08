import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contact from "@/pages/Contact";
import { CatalogState } from "@/components/CatalogState";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Honest storefront states", () => {
  it("retains a valid inquiry and never claims delivery or makes a request", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<MemoryRouter><Contact /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Test customer" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Device or service inquiry"), { target: { value: "Is this model available?" } });
    fireEvent.click(screen.getByRole("button", { name: "Review inquiry" }));
    expect(screen.getByRole("status")).toHaveTextContent("Nothing has been sent");
    expect(screen.getByLabelText("Device or service inquiry")).toHaveValue("Is this model available?");
    expect(fetchSpy).not.toHaveBeenCalled();
  });
  it("focuses invalid fields and keeps the entered message", () => {
    render(<MemoryRouter><Contact /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText("Device or service inquiry"), { target: { value: "Keep this message" } });
    fireEvent.click(screen.getByRole("button", { name: "Review inquiry" }));
    expect(screen.getByLabelText("Name")).toHaveFocus();
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Device or service inquiry")).toHaveValue("Keep this message");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
  it("distinguishes a failed catalog from an empty catalog and offers retry", () => {
    const retry = vi.fn();
    render(<MemoryRouter><CatalogState error onRetry={retry} /></MemoryRouter>);
    expect(screen.getByRole("status")).toHaveTextContent("couldn’t load");
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
    expect(screen.queryByText("No matching devices right now.")).not.toBeInTheDocument();
  });
});
