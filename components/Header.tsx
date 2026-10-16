"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CTA } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchTerm = searchParams.get("search") || "";
  const [searchExpanded, setSearchExpanded] = useState(!!searchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.replace(`?${params.toString()}`, { scroll: false });

    // Smoothly scroll to catalog section if not there
    const catalog = document.getElementById("catalogo");
    if (catalog) {
      catalog.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.replace(`?${params.toString()}`, { scroll: false });
    setSearchExpanded(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 h-[190px] bg-gradient-to-b from-[#aebac9] to-transparent flex items-start pt-[60px]">
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 flex items-center justify-between relative">

        {/* Lilian Logo */}
        <Link href="/" className="relative w-32 sm:w-40 md:w-48 h-20 hover:scale-105 transition-transform duration-200 mt-2">
          <Image
            src="/assets/bdd1bcfba9ab9c71befc317985ccfb5cd63b9ecd.svg"
            alt="Lilian Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[17px] font-medium text-lilian-purple font-chronica">
          <Link href="/" className="hover:text-lilian-orange transition-colors">
            Inicio
          </Link>
          <Link href="#historia" className="hover:text-lilian-orange transition-colors">
            Nuestra Historia
          </Link>
          <Link href="#catalogo" className="hover:text-lilian-orange transition-colors">
            Catálogo
          </Link>
          <Link href="#galeria" className="hover:text-lilian-orange transition-colors">
            Galería
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          {/* Desktop Expandable Search Input */}
          <div className="relative flex items-center transition-all duration-300">
            {searchExpanded ? (
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-full border border-white/10 transition-all duration-300 w-[220px] focus-within:bg-white/35">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-lilian-purple shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar..."
                  autoFocus
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onBlur={() => {
                    if (!searchTerm) {
                      setSearchExpanded(false);
                    }
                  }}
                  className="bg-transparent border-none outline-none text-lilian-purple placeholder-lilian-purple/65 text-sm w-full font-gotham"
                />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="text-lilian-purple/60 hover:text-lilian-purple shrink-0 ml-1"
                    aria-label="Limpiar búsqueda"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setSearchExpanded(true)}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                aria-label="Buscar productos"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-lilian-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Desktop Call to Action Button */}
          <Link
            href={CTA.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-medium text-[16px] px-8 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-md"
          >
            <Image src="/assets/pedidosya.png" alt="" width={18} height={18} aria-hidden="true" className="object-contain" />
            Ordena en Pedidos ya
          </Link>
        </div>

        {/* Mobile search and menu button container */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Search Button (Opens drawer and focuses search) */}
          <button
            onClick={() => {
              setMobileMenuOpen(true);
            }}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
            aria-label="Buscar productos"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-lilian-purple">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-lilian-purple hover:text-lilian-orange transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-8 h-8"
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
          {/* Header row in mobile overlay */}
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
            {/* Close button */}
            <button
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

          {/* Mobile Search Input Pill inside Drawer */}
          <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full border border-white/10 mb-6 focus-within:bg-white/15 transition-colors">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-white/75 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-transparent border-none outline-none text-white placeholder-white/50 text-base w-full font-gotham"
            />
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-5 text-[22px] font-chronica font-bold text-white/90">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-lilian-orange hover:translate-x-2 transition-all duration-200 py-2 border-b border-white/10"
            >
              Inicio
            </Link>
            <Link
              href="#historia"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-lilian-orange hover:translate-x-2 transition-all duration-200 py-2 border-b border-white/10"
            >
              Nuestra Historia
            </Link>
            <Link
              href="#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-lilian-orange hover:translate-x-2 transition-all duration-200 py-2 border-b border-white/10"
            >
              Catálogo
            </Link>
            <Link
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-lilian-orange hover:translate-x-2 transition-all duration-200 py-2 border-b border-white/10"
            >
              Galería
            </Link>
          </nav>
        </div>

        {/* Footer of the Drawer */}
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
  );
}
