import Link from "next/link";
import { useRouter } from "next/router";
import BotBlockLogo from "../BotBlockLogo";
import { UserButton } from "../UserButton/UserButton";
import { NavLinks } from "./navLinks";

export const Header = () => {
  const router = useRouter();

  const checkLinkIsActive = (href: string) => {
    return router.pathname.includes(href);
  };

  return (
    <div className="sticky top-0 z-10 border-b-[0.5px] backdrop-filter backdrop-blur">
      <div className="container mx-auto px-5 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <BotBlockLogo />
          <div className="space-x-2 ml-10 text-sm">
            {NavLinks.map(navLink => (
              <Link
                key={navLink.name}
                href={navLink.href}
                className={`text-white px-2 py-2 ${checkLinkIsActive(navLink.href) ? "bg-[#3F22A2] rounded-2xl" : ""}`}
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
