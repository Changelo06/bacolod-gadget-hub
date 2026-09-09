import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { DEMO_MODE } from "@/lib/catalog";
import { CategoryNav } from "./CategoryNav";

export const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      <CategoryNav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>
      {DEMO_MODE && <div className="preview-notice">Design preview: sample products, promotions and prices. No orders or payments are taken.</div>}
      <Footer />
    </div>
  );
};
