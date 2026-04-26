import { Link } from "react-router-dom";
import logo from "@/assets/iwarehouse-logo.png";

export const Logo = ({ variant = "dark" }: { variant?: "dark" | "light" }) => (
  <Link to="/" className="flex items-center gap-2" aria-label="iWarehouse home">
    <img
      src={logo}
      alt="iWarehouse"
      className={`h-9 w-auto ${variant === "light" ? "" : "invert-[0.92]"} `}
      style={variant === "light" ? {} : { filter: "invert(1)" }}
    />
  </Link>
);
