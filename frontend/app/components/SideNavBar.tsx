

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItemConfig } from "../types/navItemConfig";
import {  useState } from "react";
import { Home, Headphones, Settings, User, KeyRound, Handshake } from "lucide-react";

const mainNavBase: NavItemConfig[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/customers", label: "Customers", icon: User },
  { href: "/orders", label: "Orders", icon: Handshake },
];

const secondaryNav: NavItemConfig[] = [
  { href: "/support", label: "Support", icon: Headphones },
  { href: "/settings", label: "Settings", icon: Settings },
];

// Funktion zum Prüfen, ob Token gültig ist
const getInitialLoginState = (): boolean => {
  return false}
  /* const stored = localStorage.getItem("token");
  if (!stored) return false;
  try {
    const payload = JSON.parse(atob(stored.split(".")[1]));
    if (payload.exp * 1000 > Date.now()) return true;
    localStorage.removeItem("token"); // abgelaufen
    return false;
  } catch {
    localStorage.removeItem("token");
    return false;
  } */


function DesktopNavItem({
  href,
  icon: Icon,
  label,
  onClick,
}: NavItemConfig & { onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
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

function MobileNavItem({
  href,
  icon: Icon,
  label,
  onClick,
}: NavItemConfig & { onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex flex-col items-center gap-1 text-xs"
    >
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
  const [isLoggedIn] = useState(getInitialLoginState);


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const mainNav = [
    ...mainNavBase,
    isLoggedIn
      ? { href: "#", label: "Logout", icon: KeyRound, onClick: handleLogout }
      : { href: "/login", label: "Login", icon: KeyRound },
  ];

  return (
    <nav className="flex h-full flex-col justify-between rounded-3xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
      <div className="space-y-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white text-xs font-semibold">
          AK {/* hier kann User Initial kommen */}
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
  const [isLoggedIn] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const mainNav = [
    ...mainNavBase,
    isLoggedIn
      ? { href: "#", label: "Logout", icon: KeyRound, onClick: handleLogout }
      : { href: "/login", label: "Login", icon: KeyRound },
  ];

  return (
    <nav className="fixed bottom-4 inset-x-4 z-50 flex items-center justify-around rounded-2xl bg-white px-4 py-2 shadow-lg ring-1 ring-slate-200 md:hidden">
      {mainNav.map((item) => (
        <MobileNavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
