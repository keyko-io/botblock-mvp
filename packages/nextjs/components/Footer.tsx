import Link from "next/link";
import { NavLinks } from "./Header/navLinks";
import { LargeLogo } from "./LargeLogo";

export const Footer = () => {
  return (
    <div className="bg-[#fff] py-14 px-10">
      <div className="flex container mx-auto px-6 items-start space-x-20">
        <LargeLogo />

        <div className="flex flex-col mt-2">
          <h3>Sections</h3>
          <div className="flex flex-col mt-4 gap-2">
            {NavLinks.map(navLink => (
              <Link key={navLink.name} href={navLink.href} className="text-sm">
                {navLink.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
