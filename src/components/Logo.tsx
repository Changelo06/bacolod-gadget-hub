import { Link } from "react-router-dom";
import logo from "@/assets/iwarehouse-logo.png";

export const Logo = ({ variant = "dark" }: { variant?: "dark" | "light" }) => (
  <Link to="/" className={'brand-logo brand-logo-' + variant} aria-label="iWarehouse home">
    <img src={logo} alt="iWarehouse" width="864" height="864" />
  </Link>
);
