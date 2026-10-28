"use client";

import React, { useState } from "react";
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

  const searchButtonClass = `w-9 h-9 xl:w-11 xl:h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
    isHome
      ? "bg-white/20 hover:bg-white/40 text-lilian-purple"
      : "bg-lilian-purple/5 hover:bg-lilian-purple/10 text-lilian-purple border border-lilian-purple/10"
  }`;

  return (
    <>
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
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? "text-lilian-orange font-bold border-b-2 border-lilian-orange"
                      : "hover:text-lilian-orange text-lilian-purple"
                  }`}
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
              className="bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-semibold text-[13px] xl:text-[15px] px-5 xl:px-7 py-2.5 rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-md"
            >
              <Image src="/assets/pedidosya.png" alt="" width={16} height={16} aria-hidden="true" className="object-contain" />
              <span>Pedidos ya</span>
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

        {/* Mobile Navigation Drawer Overlay */}
        <div
          className={`fixed inset-0 z-[100] bg-lilian-purple/95 backdrop-blur-lg lg:hidden flex flex-col justify-between px-6 py-8 transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "translate-x-0 opacity-100 pointer-events-auto"
              : "translate-x-full opacity-0 pointer-events-none"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-10 mt-2">
              <div className="relative w-32 h-16">
                <Image
                  src="/assets/bdd1bcfba9ab9c71befc317985ccfb5cd63b9ecd.svg"
                  alt="Lilian Logo"
                  fill
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
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

            <nav className="flex flex-col gap-2 text-[18px] sm:text-[20px] font-chronica font-bold text-white/90 overflow-y-auto max-h-[48vh] pr-2">
              {Object.values(NAV_LINKS).map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`hover:text-lilian-orange hover:translate-x-2 transition-all duration-200 py-1.5 border-b border-white/10 ${
                      isActive ? "text-lilian-orange font-bold pl-2 border-lilian-orange" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col gap-4 mb-4">
            <Link
              href={CTA.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full justify-center bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-medium text-[16px] py-4 rounded-full flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg text-center"
            >
              <Image src="/assets/pedidosya.png" alt="" width={18} height={18} aria-hidden="true" className="object-contain" />
              Ordena en Pedidos ya
            </Link>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
