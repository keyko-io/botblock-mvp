import Link from "next/link";
import { useRouter } from "next/router";
import { LargeLogo } from "../LargeLogo";
import { UserButton } from "../UserButton/UserButton";
import { NavLinks } from "./navLinks";

export const Header = () => {
  const router = useRouter();

  const checkLinkIsActive = (href: string) => {
    return router.pathname.includes(href);
  };

  return (
    <div className="sticky top-0 z-10 border-b border-gray-400 bg-[#fff]">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <LargeLogo />
          <div className="space-x-2 ml-12 text-sm">
            {NavLinks.map(navLink => (
              <Link
                key={navLink.name}
                href={navLink.href}
                className={`px-2 py-2 ${checkLinkIsActive(navLink.href) ? "bg-[#3F22A2] rounded-2xl text-white" : ""}`}
              >
                {navLink.name}
              </Link>
            ))}
          </div>
        </div>
        <UserButton />
      </div>
    </div>
  );
};
