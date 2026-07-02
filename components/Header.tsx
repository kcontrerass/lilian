"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { CTA_LABELS, NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <Link href={NAV_LINKS.home.href} className="hover:text-lilian-orange transition-colors">
            {NAV_LINKS.home.label}
          </Link>
          <Link href={NAV_LINKS.history.href} className="hover:text-lilian-orange transition-colors">
            {NAV_LINKS.history.label}
          </Link>
          <Link href={NAV_LINKS.catalog.href} className="hover:text-lilian-orange transition-colors">
            {NAV_LINKS.catalog.label}
          </Link>
          <Link href={NAV_LINKS.gallery.href} className="hover:text-lilian-orange transition-colors">
            {NAV_LINKS.gallery.label}
          </Link>
          <Link href={NAV_LINKS.testimonials.href} className="hover:text-lilian-orange transition-colors">
            {NAV_LINKS.testimonials.label}
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          {/* Search Icon Placeholder */}
          <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-lilian-purple">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Desktop Call to Action Button */}
          <Link
            href="#"
            className="bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-medium text-[16px] px-8 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-md"
          >
            <span className="w-4 h-4 block bg-white rounded-sm" />
            {CTA_LABELS.orderNow}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-lilian-purple hover:text-lilian-orange transition-colors focus:outline-none"
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

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[100px] left-0 right-0 bg-[#aebac9] shadow-lg border-t border-white/20 z-50">
          <nav className="flex flex-col px-6 py-8 gap-4 text-[17px] font-chronica font-medium text-lilian-purple">
            <Link
              href={NAV_LINKS.home.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-lilian-orange transition-colors py-2 border-b border-lilian-purple/10"
            >
              {NAV_LINKS.home.label}
            </Link>
            <Link
              href={NAV_LINKS.history.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-lilian-orange transition-colors py-2 border-b border-lilian-purple/10"
            >
              {NAV_LINKS.history.label}
            </Link>
            <Link
              href={NAV_LINKS.catalog.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-lilian-orange transition-colors py-2 border-b border-lilian-purple/10"
            >
              {NAV_LINKS.catalog.label}
            </Link>
            <Link
              href={NAV_LINKS.gallery.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-lilian-orange transition-colors py-2 border-b border-lilian-purple/10"
            >
              {NAV_LINKS.gallery.label}
            </Link>
            <Link
              href={NAV_LINKS.testimonials.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-lilian-orange transition-colors py-2 border-b border-lilian-purple/10"
            >
              {NAV_LINKS.testimonials.label}
            </Link>
            <Link
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex justify-center bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white px-6 py-3 mt-4 rounded-full"
            >
              {CTA_LABELS.orderNow}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
