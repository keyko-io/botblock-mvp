import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LargeLogo } from "../LargeLogo";
import { UserButton } from "../UserButton/UserButton";
import { palette } from "~~/styles/colors";
import { Row } from "~~/ui";

const NavLink = ({ children, href }: PropsWithChildren<{ href: string }>) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
      style={{ backgroundColor: isActive ? palette.slate[50] : "#000000", color: "#FFFFFF" }}
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
    <Row as="ul" style={{ width: undefined }}>
      <li style={{ padding: "0px 5px 0px 0px" }}>
        <NavLink href="/protect/landing">Protect</NavLink>
      </li>
      <li style={{ padding: "0px 5px 0px 0px" }}>
        <NavLink href="/partner">Partner</NavLink>
      </li>
      <li style={{ padding: "0px 5px 0px 0px" }}>
        <NavLink href="/subscribe">Subscribe</NavLink>
      </li>
    </Row>
  );

  return (
    <Row style={{ justifyContent: "space-between", padding: "24px" }} className="border-b-gray-500 border-b-2">
      <Row style={{ width: undefined, gap: "24px" }}>
        <LargeLogo isDark  />
        {navLinks}
      </Row>
      <UserButton />
    </Row>
  );
};
