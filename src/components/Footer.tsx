import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-directory">
        <div className="footer-brand">
          <Logo variant="light" />
          <p>Technology for everyone.<br />Find your everyday at iWarehouse.</p>
        </div>
        <nav className="footer-column" aria-labelledby="footer-shop">
          <h2 id="footer-shop">Shop</h2>
          <ul>
            <li><Link to="/shop?category=phones">Phones</Link></li>
            <li><Link to="/shop?category=laptops">Laptops</Link></li>
            <li><Link to="/shop?category=tablets">Tablets</Link></li>
            <li><Link to="/shop?category=audio">Audio</Link></li>
            <li><Link to="/shop?category=accessories">Accessories</Link></li>
            <li><Link to="/shop?category=computers">PCs & displays</Link></li>
          </ul>
        </nav>
        <nav className="footer-column" aria-labelledby="footer-help">
          <h2 id="footer-help">Customer care</h2>
          <ul>
            <li><Link to="/contact">Contact & inquiries</Link></li>
            <li><Link to="/cpo">Pre-owned guide</Link></li>
            <li><Link to="/store">Store information</Link></li>
          </ul>
        </nav>
        <nav className="footer-column" aria-labelledby="footer-branches">
          <h2 id="footer-branches">Our branches</h2>
          <ul>
            <li><Link to="/store?branch=bacolod">Bacolod</Link></li>
            <li><Link to="/store?branch=cadiz">Cadiz</Link></li>
            <li><Link to="/store?branch=la-carlota">La Carlota</Link></li>
            <li><Link to="/store?branch=dumaguete">Dumaguete</Link></li>
            <li><Link to="/store?branch=kabankalan">Kabankalan</Link></li>
          </ul>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} iWarehouse. All rights reserved.</p>
        <p>Design proof of concept</p>
      </div>
    </div>
  </footer>
);
