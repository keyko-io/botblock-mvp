import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LargeLogo } from "../LargeLogo";
import { LoginButton } from "./LoginButton";

const NavLink = ({ children, href }: PropsWithChildren<{ href: string }>) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "bg-secondary text-white shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const navLinks = (
    <ul className="flex flex-row ml-32">
      <li>
        <NavLink href="/protect/landing">Protect</NavLink>
      </li>
      <li>
        <NavLink href="/unlock/partner/landing">Partner</NavLink>
      </li>
      <li>
        <NavLink href="/subscribe">Subscribe</NavLink>
      </li>
    </ul>
  );

  return (
    <div className="flex flex-row justify-between items-center px-12 py-6 border-b-gray-500 border-b-2">
      <div className="flex flex-row">
        <LargeLogo />
        <div className="w-8" />
        {navLinks}
      </div>
      <LoginButton />
    </div>
  );
};
