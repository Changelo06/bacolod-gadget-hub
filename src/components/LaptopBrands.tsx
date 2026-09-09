import { Link } from "react-router-dom";

const brands = [
  { name: "Lenovo", logo: "lenovo.svg", image: "/images/device-81.webp", href: "/shop?category=laptops&brand=Lenovo" },
  { name: "Acer", logo: "acer.svg", image: "/images/laptop-brands/acer-laptop.jpg", href: "/shop?category=laptops&brand=Acer" },
  { name: "ASUS", logo: "asus.svg", image: "/images/device-79.webp", href: "/shop?category=laptops&brand=Asus" },
  { name: "ROG", logo: "republicofgamers.svg", image: "/images/laptop-brands/rog-laptop.webp", href: "/shop?category=laptops&brand=Asus&q=ROG" },
  { name: "Gigabyte", logo: "gigabyte.svg", image: "/images/laptop-brands/gigabyte-laptop.png", href: "/shop?category=laptops&brand=Gigabyte" },
];

export function LaptopBrands() {
  return <section className="retail-section" aria-labelledby="laptop-brands-title">
    <div className="retail-section-heading"><h2 id="laptop-brands-title">Laptops by brand</h2><Link to="/shop?category=laptops" className="quiet-link">View all</Link></div>
    <div className="laptop-brand-grid">{brands.map((brand) => <Link key={brand.name} to={brand.href} className="laptop-brand-tile" aria-label={`Browse ${brand.name} laptops`}>
      <img className="laptop-brand-device" src={brand.image} alt="" width="500" height="500" loading="lazy" />
      <span className="laptop-brand-shade" aria-hidden="true" />
      <img className="laptop-brand-logo" src={"/images/laptop-brands/" + brand.logo} alt={brand.name} width="180" height="180" loading="lazy" />
      <span className="laptop-brand-caption">Explore laptops</span>
    </Link>)}</div>
  </section>;
}
