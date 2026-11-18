"use client";
import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { PageDetails } from "./site-details";
export function SiteFrame({ children, footer }) {
  const path = usePathname();
  if (path === "/resume-studio") return children;
  return (
    <>
      <Navigation />
      <PageDetails />
      {children}
      {footer}
    </>
  );
}
