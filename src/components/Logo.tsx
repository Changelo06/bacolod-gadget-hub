import { Link } from "react-router-dom";

export const Logo = ({ variant = "dark" }: { variant?: "dark" | "light" }) => (
  <Link to="/" className={'concept-brand concept-brand-' + variant} aria-label="iWherehouse home">
    <span className="concept-brand-mark" aria-hidden="true"><img src="/iwherehouse-monogram.png" alt="" width="1280" height="1280" /></span>
    <span className="concept-brand-name"><span>i</span>Wherehouse</span>
  </Link>
);
