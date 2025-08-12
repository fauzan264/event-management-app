import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Sidebar({ children }: { children: ReactNode }) {
  const { userRole } = useAuthStore();
  const pathname = usePathname();

  const nav_items = [
    { href: "/app", label: "Dashboard" },
    { href: "/app/event-organizer", label: "Organizer Profile" },
    { href: "/app/events", label: "Events" },
    { href: "/app/transactions-organizer", label: "Transaction Organizer" },
    { href: "/app/transactions", label: "Transaction" },
  ];

  return (
    <div className="flex flex-1 pt-16">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center">
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-purple-900 text-gray-200 min-h-full w-80 p-4 pt-18 md:pt-3">
            {nav_items.map((nav_item, i) => {
              return userRole != "EVENT_ORGANIZER" &&
                nav_item.href == "/app/transactions" ? (
                <Link
                  key={i}
                  href={nav_item.href}
                  // pt-5 text-md font-semibold px-4 py-3 flex items-center rounded-md transition-colors
                  className={`pt-5 text-md font-semibold py-3 px-4 flex items-center rounded-md transition-colors ${
                    pathname == nav_item.href
                      ? "bg-blue-700"
                      : "hover:bg-blue-800 hover:text-white"
                  } `}
                >
                  {nav_item.label}
                </Link>
              ) : (
                <Link
                  key={i}
                  href={nav_item.href}
                  // pt-5 text-md font-semibold px-4 py-3 flex items-center rounded-md transition-colors
                  className={`pt-5 text-md font-semibold py-3 px-4 flex items-center rounded-md transition-colors ${
                    pathname == nav_item.href
                      ? "bg-blue-700"
                      : "hover:bg-blue-800 hover:text-white"
                  } `}
                >
                  {nav_item.label}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
