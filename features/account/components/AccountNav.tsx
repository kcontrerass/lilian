"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ACCOUNT_ROUTES, ACCOUNT_TEXTS } from "../constants";
import { useAuth } from "../context/AuthContext";

export default function AccountNav() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const links = [
    { href: ACCOUNT_ROUTES.root, label: ACCOUNT_TEXTS.accountNavProfile },
    { href: ACCOUNT_ROUTES.orders, label: ACCOUNT_TEXTS.accountNavOrders },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
      <nav className="flex flex-wrap gap-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`py-2.5 px-4 rounded-full text-sm font-chronica font-semibold transition-all border ${
                active
                  ? "bg-lilian-purple text-white border-lilian-purple shadow-md"
                  : "bg-white/70 text-lilian-purple/75 border-lilian-purple/10 hover:border-lilian-orange/35 hover:bg-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={logout}
        className="text-sm font-chronica font-semibold text-lilian-pink hover:underline cursor-pointer"
      >
        {ACCOUNT_TEXTS.logout}
      </button>
    </div>
  );
}
