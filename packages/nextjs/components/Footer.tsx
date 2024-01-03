import Link from "next/link";
import BotBlockLogo from "./BotBlockLogo";
import { NavLinks } from "./Header/navLinks";

export const Footer = () => {
  return (
    <div className="bg-[#1a5e73] py-14">
      <div className="container mx-auto flex px-6 items-start">
        <BotBlockLogo />

        <div className="flex flex-col flex-1 justify-start items-start text-white ml-40">
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
