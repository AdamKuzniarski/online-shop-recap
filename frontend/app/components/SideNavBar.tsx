"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItemConfig } from "../types/navItemConfig";
import {
  Home,
  ShoppingBag,
  ListTodo,
  Headphones,
  Settings,
  User,
} from "lucide-react";

const mainNav: NavItemConfig[] = [
  { href: "/user", label: "User", icon: User },
  { href: "/", label: "Home", icon: Home },

  { href: "/orders", label: "Orders", icon: ShoppingBag },
  { href: "/list", label: "List", icon: ListTodo },
];

const secondaryNav: NavItemConfig[] = [
  { href: "/support", label: "Support", icon: Headphones },
  { href: "/settings", label: "Settings", icon: Settings },
];

function DesktopNavItem({ href, icon: Icon, label }: NavItemConfig) {
  const pathname = usePathname();
  const isActive = pathname === href;

  console.log("pathname", pathname, "href", href, "isActive", isActive);
  return (
    <Link
      href={href}
      className={[
        "flex h-11 w-11 items-center justify-center rounded-2xl transition",
        "hover:bg-emerald-50 hover:text-emerald-600",
        isActive
          ? "bg-emerald-500 text-white shadow-md"
          : "bg-white text-slate-500",
      ].join(" ")}
    >
      <Icon className="h-5 w-5" />
      <span className="sr-only">{label}</span>
    </Link>
  );
}

function MobileNavItem({ href, icon: Icon, label }: NavItemConfig) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="flex flex-col items-center gap-1 text-xs">
      <Icon
        className={[
          "h-5 w-5",
          isActive ? "text-emerald-500" : "text-slate-400",
        ].join(" ")}
      />
      <span className={isActive ? "text-emerald-600" : "text-slate-500"}>
        {label}
      </span>
    </Link>
  );
}

export function SidebarNav() {
  return (
    <nav className="flex h-full flex-col justify-between rounded-3xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
      <div className="space-y-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white text-xs font-semibold">
          AK {/* //hier wird users Initial */}
        </div>

        <div className="flex flex-col gap-2">
          {mainNav.map((item) => (
            <DesktopNavItem key={item.href} {...item} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {secondaryNav.map((item) => (
          <DesktopNavItem key={item.href} {...item} />
        ))}
      </div>
    </nav>
  );
}

export function MobileNav() {
  return (
    <nav className="fixed bottom-4 inset-x-4 z-50 flex items-center justify-around rounded-2xl bg-white px-4 py-2 shadow-lg ring-1 ring-slate-200 md:hidden">
      {mainNav.map((item) => (
        <MobileNavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
