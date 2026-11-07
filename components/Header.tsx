"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CTA, NAV_LINKS } from "@/lib/constants";
import { SEARCH_TEXTS } from "@/features/search/constants";
import SearchOverlay from "@/features/search/components/SearchOverlay";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const isCurrentPath = (href: string) => {
    if (href.includes("#")) return false;
    const current = pathname.replace(/\/$/, "") || "/";
    const target = href.replace(/\/$/, "") || "/";
    return current === target;
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const searchButtonClass = `w-9 h-9 xl:w-11 xl:h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
    isHome
      ? "bg-white/20 hover:bg-white/40 text-lilian-purple"
      : "bg-lilian-purple/5 hover:bg-lilian-purple/10 text-lilian-purple border border-lilian-purple/10"
  }`;

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[300] focus:rounded-full focus:bg-lilian-purple focus:px-4 focus:py-2 focus:text-sm focus:font-chronica focus:text-white"
      >
        Saltar al contenido
      </a>
      <header
        className={`left-0 right-0 z-50 transition-all duration-300 ${
          isHome
            ? "absolute top-0 h-[190px] bg-gradient-to-b from-[#aebac9] to-transparent flex items-start pt-[60px]"
            : "sticky top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-lilian-purple/10 flex items-center py-3 sm:py-4"
        }`}
      >
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 flex items-center justify-between relative">

          {/* Lilian Logo */}
          <Link href="/" className={`relative hover:scale-105 transition-transform duration-200 shrink-0 ${isHome ? "w-32 sm:w-40 md:w-44 h-20 mt-2" : "w-28 sm:w-36 h-14"}`}>
            <Image
              src="/assets/bdd1bcfba9ab9c71befc317985ccfb5cd63b9ecd.svg"
              alt="Lilian Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-[13px] xl:text-[15px] font-medium text-lilian-purple font-chronica whitespace-nowrap">
            {Object.values(NAV_LINKS).map((link) => {
              const isActive = isCurrentPath(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? "text-lilian-orange font-bold border-b-2 border-lilian-orange"
                      : "hover:text-lilian-orange text-lilian-purple"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 xl:gap-5 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={searchButtonClass}
              aria-label={SEARCH_TEXTS.openLabel}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-lilian-purple">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link
              href={CTA.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-lilian-purple font-chronica font-semibold text-[13px] xl:text-[15px] px-5 xl:px-7 py-2.5 rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-md"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 17 16" aria-hidden="true">
                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M0.155793 0.00242139C4.01169 -0.00403548 7.86754 0.00242139 11.7234 0.0217881C14.3515 0.401632 16.0587 1.85415 16.845 4.3793C17.3478 6.88199 16.6273 8.95423 14.6834 10.596C14.0532 11.0449 13.3651 11.3806 12.6192 11.6031C12.2326 11.6844 11.8431 11.7489 11.4507 11.7968C9.47738 11.8161 7.50404 11.8226 5.53062 11.8161C5.26897 12.823 5.00284 13.83 4.73219 14.8373C4.4953 15.4216 4.07334 15.8024 3.46637 15.98C2.37953 16.0121 1.29545 16.0056 0.214215 15.9606C0.126785 15.8297 0.100818 15.6876 0.136319 15.5345C0.83701 12.8516 1.53806 10.1661 2.23951 7.47798C2.27196 7.44572 2.30444 7.41341 2.33688 7.38115C5.32291 7.36825 8.3089 7.35531 11.2949 7.34242C12.3581 7.05521 12.754 6.37737 12.4828 5.30891C12.2657 4.87331 11.9217 4.59575 11.4507 4.47614C8.64646 4.46324 5.8422 4.4503 3.03795 4.4374C2.20555 4.418 1.45257 4.1727 0.778961 3.70147C0.366331 3.30038 0.113168 2.81622 0.019475 2.24896C-0.00649166 1.55176 -0.00649166 0.854558 0.019475 0.157355C0.0730519 0.110678 0.118493 0.0590342 0.155793 0.00242139Z" />
              </svg>
              <span>PedidosYa</span>
            </Link>
          </div>

          {/* Mobile search and menu button container */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                isHome
                  ? "bg-white/20 hover:bg-white/40 text-lilian-purple"
                  : "bg-lilian-purple/5 text-lilian-purple border border-lilian-purple/10"
              }`}
              aria-label={SEARCH_TEXTS.openLabel}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-lilian-purple">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-lilian-purple hover:text-lilian-orange transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Fuera del header: backdrop-blur en el header rompe `fixed inset-0` y el menú solo cubría la barra */}
      <div
        className={`fixed inset-0 z-[100] bg-lilian-purple/95 backdrop-blur-lg lg:hidden flex flex-col justify-between px-6 py-8 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "translate-x-0 opacity-100 pointer-events-auto visible"
            : "translate-x-full opacity-0 pointer-events-none invisible"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div>
          <div className="flex items-center justify-between mb-10">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="relative w-32 h-16 shrink-0"
            >
              <Image
                src="/assets/bdd1bcfba9ab9c71befc317985ccfb5cd63b9ecd.svg"
                alt="Lilian Logo"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-white transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav
            className="flex flex-col gap-2 text-[18px] sm:text-[20px] font-chronica font-bold text-white/90 overflow-y-auto max-h-[min(52vh,100dvh-16rem)] pr-2"
            aria-label="Menú principal"
          >
            {Object.values(NAV_LINKS).map((link) => {
              const isActive = isCurrentPath(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`hover:text-lilian-orange hover:translate-x-2 transition-all duration-200 py-1.5 border-b border-white/10 ${
                    isActive ? "text-lilian-orange font-bold pl-2 border-lilian-orange" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href={CTA.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full justify-center bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-lilian-purple font-chronica font-medium text-[16px] py-4 rounded-full flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg text-center"
          >
            <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 17 16" aria-hidden="true">
              <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M0.155793 0.00242139C4.01169 -0.00403548 7.86754 0.00242139 11.7234 0.0217881C14.3515 0.401632 16.0587 1.85415 16.845 4.3793C17.3478 6.88199 16.6273 8.95423 14.6834 10.596C14.0532 11.0449 13.3651 11.3806 12.6192 11.6031C12.2326 11.6844 11.8431 11.7489 11.4507 11.7968C9.47738 11.8161 7.50404 11.8226 5.53062 11.8161C5.26897 12.823 5.00284 13.83 4.73219 14.8373C4.4953 15.4216 4.07334 15.8024 3.46637 15.98C2.37953 16.0121 1.29545 16.0056 0.214215 15.9606C0.126785 15.8297 0.100818 15.6876 0.136319 15.5345C0.83701 12.8516 1.53806 10.1661 2.23951 7.47798C2.27196 7.44572 2.30444 7.41341 2.33688 7.38115C5.32291 7.36825 8.3089 7.35531 11.2949 7.34242C12.3581 7.05521 12.754 6.37737 12.4828 5.30891C12.2657 4.87331 11.9217 4.59575 11.4507 4.47614C8.64646 4.46324 5.8422 4.4503 3.03795 4.4374C2.20555 4.418 1.45257 4.1727 0.778961 3.70147C0.366331 3.30038 0.113168 2.81622 0.019475 2.24896C-0.00649166 1.55176 -0.00649166 0.854558 0.019475 0.157355C0.0730519 0.110678 0.118493 0.0590342 0.155793 0.00242139Z" />
            </svg>
            Ordena en PedidosYa
          </Link>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
