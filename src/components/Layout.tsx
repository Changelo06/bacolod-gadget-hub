import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingChat } from "./FloatingChat";
import { useCartSync } from "@/hooks/useCartSync";

export const Layout = () => {
  useCartSync();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
};
