import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-content">
      <Logo variant="light" />
      <nav aria-label="Footer navigation">
        <Link to="/cpo">Pre-owned</Link>
        <Link to="/store">Our branches</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <p>© {new Date().getFullYear()} iWarehouse</p>
    </div>
  </footer>
);
