import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import { Logo } from "./Logo";

const SHOP_LINKS = [
  { to: "/shop?q=phone", label: "Phones" },
  { to: "/shop?q=laptop", label: "Laptops" },
  { to: "/shop?q=pc OR desktop", label: "PCs" },
  { to: "/shop?q=accessory", label: "Accessories" },
];

const SERVICE_LINKS = [
  { to: "/cpo", label: "Certified Pre-Owned" },
  { to: "/store", label: "Trade-In Program" },
  { to: "/store", label: "Repair Services" },
  { to: "/store", label: "Flexible Payments" },
];

const COMPANY_LINKS = [
  { to: "/store", label: "Store Updates" },
  { to: "/store", label: "Branches" },
  { to: "/contact", label: "Contact" },
  { to: "/shop", label: "Shop All" },
];

export const Footer = () => (
  <footer className="mt-20 bg-zinc-800 text-white">
    <div className="container py-10 md:py-12">
      <div className="grid gap-8 border-b border-white/15 pb-9 lg:grid-cols-[240px_1fr] lg:items-start">
        <div className="max-w-[220px]">
          <Logo variant="light" />
        </div>
        <p className="max-w-4xl text-sm font-medium leading-relaxed text-zinc-100">
          As Negros' trusted gadget destination, iWarehouse makes technology available for everyone through new devices,
          certified pre-owned gadgets, repairs, trade-ins, and flexible payment options across our branches.
        </p>
      </div>

      <div className="grid gap-10 py-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <FooterColumn title="Shop Devices" links={SHOP_LINKS} />
        <FooterColumn title="Services" links={SERVICE_LINKS} />
        <FooterColumn title="Company" links={COMPANY_LINKS} />

        <div>
          <h4 className="mb-5 inline-block border-b border-white pb-2 text-base font-semibold">Contact us</h4>
          <ul className="space-y-3 text-zinc-100">
            <li className="flex gap-2 leading-relaxed">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>888 Mall, Bacolod plus Cadiz, La Carlota, Dumaguete & Kabankalan</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <span>+63 900 000 0000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <span>hello@iwarehouse.ph</span>
            </li>
          </ul>

          <div className="mt-5 flex gap-2">
            <SocialLink href="https://facebook.com" label="Facebook" className="bg-[#1877f2]">
              <Facebook className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="https://m.me/iwarehouse" label="Messenger" className="bg-[#0084ff]">
              <MessageCircle className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="https://youtube.com" label="YouTube" className="bg-[#ff0000]">
              <Youtube className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="https://instagram.com" label="Instagram" className="bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#515bd4]">
              <Instagram className="h-4 w-4" />
            </SocialLink>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 pt-5 text-xs text-zinc-300">
        Copyright {new Date().getFullYear()} iWarehouse. Making technology available for everyone.
      </div>
    </div>
  </footer>
);

const FooterColumn = ({ title, links }: { title: string; links: Array<{ to: string; label: string }> }) => (
  <div>
    <h4 className="mb-5 inline-block border-b border-white pb-2 text-base font-semibold">{title}</h4>
    <ul className="space-y-3 text-zinc-100">
      {links.map((link) => (
        <li key={`${link.to}-${link.label}`}>
          <Link to={link.to} className="hover:underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLink = ({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-0.5 ${className}`}
  >
    {children}
  </a>
);
