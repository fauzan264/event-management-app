"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

export default function Navbar() {
  const [isScrolled, setIscrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    setActiveHref(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIscrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nav_items = [{ href: "/", label: "Home" }];

  return (
    <div
      className={`navbar fixed font-bold shadow-sm transition duration-300 left-0 top-0 z-99 px-10 bg-black text-white`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div className="btn btn-ghost lg:hidden">
            <HiOutlineMenuAlt1 className="w-6 h-6" />
          </div>
          <ul className="menu menu-sm dropdown-content rounded-b box mt-3 w-52 p-2 shadow z-100">
            {nav_items.map((nav_item, i) => {
              return (
                <li key={i}>
                  <a href={nav_item.href}>{nav_item.label}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <Link href="/">
          <h1>Event Management</h1>
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal">
          {nav_items.map((nav_item, i) => {
            return (
              <li
                key={i}
                className={`rounded-md transition hover:bg-gray-100 hover:text-black ${
                  activeHref == nav_item.href ? "bg-slate-50 text-black" : ""
                }`}
              >
                <Link
                  onClick={() => {
                    handleClick(nav_item.href);
                  }}
                  href={nav_item.href}
                >
                  {nav_item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
