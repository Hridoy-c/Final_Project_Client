import Link from "next/link";
import { navItems } from "./nav-data";

type NavLinksProps = {
  linkClassName?: string;
  onNavigate?: () => void;
};

export default function NavLinks({ linkClassName, onNavigate }: NavLinksProps) {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={linkClassName}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
