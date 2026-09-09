import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { label: "Everyday connected", title: "Your next phone.\nYour kind of everyday.", text: "Explore phones across the brands you love.", link: "/shop?category=phones", action: "Explore phones", image: "/images/device-123.webp", theme: "peach" },
  { label: "Work. Study. Create.", title: "Make room\nfor bigger ideas.", text: "Find a laptop that fits the way you work.", link: "/shop?category=laptops", action: "Explore laptops", image: "/images/device-79.webp", theme: "blue" },
  { label: "A little more freedom", title: "Take your world\nwith you.", text: "Tablets for your notes, downtime and everything between.", link: "/shop?category=tablets", action: "Explore tablets", image: "/images/device-159.webp", theme: "sage" },
];
export function PromoCarousel() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const move = (step: number) => setActive((value) => (value + step + slides.length) % slides.length);
  return <section className="promo-carousel" aria-roledescription="carousel" aria-label="Featured promotions" onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }}>
    <div className={"promo-slide promo-" + slide.theme} role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${slides.length}: ${slide.label}`}>
      <div className="promo-copy"><span className="promo-sample">Sample campaign</span><p className="promo-kicker">{slide.label}</p><h1>{slide.title}</h1><p className="promo-description">{slide.text}</p><Link className="promo-link" to={slide.link}>{slide.action}</Link></div>
      <div className="promo-art"><img src={slide.image} alt="" width="520" height="520" fetchPriority="high" /></div>
    </div>
    <div className="promo-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous promotion"><ChevronLeft size={18} /></button><div className="promo-dots">{slides.map((item, index) => <button type="button" key={item.label} aria-label={`Show promotion ${index + 1}: ${item.label}`} aria-pressed={active === index} onClick={() => setActive(index)}><span /></button>)}</div><button type="button" onClick={() => move(1)} aria-label="Next promotion"><ChevronRight size={18} /></button><span className="sr-only" aria-live="polite">Promotion {active + 1} of {slides.length}</span></div>
  </section>;
}
