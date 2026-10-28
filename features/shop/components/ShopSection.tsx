import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SHOP_TEXTS, SHOP_ASSETS, SHOP_WHATSAPP_LINK } from "../constants";
import { CTA } from "@/lib/constants";
import ScallopedBadge from "@/components/ScallopedBadge";

export default function ShopSection() {
  return (
    <div className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fdfbf7] via-white to-[#faf4e8] overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-lilian-orange/15 via-brand-cream/40 to-lilian-teal/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-lilian-beige/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-lilian-orange/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative botanical leaves on edges */}
      <div className="absolute top-12 left-0 hidden xl:block w-44 h-auto opacity-40 pointer-events-none">
        <Image
          src={SHOP_ASSETS.leafLeft}
          alt=""
          width={336}
          height={109}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="absolute top-12 right-0 hidden xl:block w-44 h-auto opacity-40 pointer-events-none">
        <Image
          src={SHOP_ASSETS.leafRight}
          alt=""
          width={345}
          height={109}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Top Artisanal Seal & Status Badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="hidden sm:block hover:rotate-12 transition-transform duration-300">
            <ScallopedBadge
              size={38}
              outerColor="#ff8f2d"
              innerColor="#3d246a"
              variant="outline"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-lilian-orange/30 shadow-sm backdrop-blur-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-lilian-orange animate-ping" />
            <span className="text-xs font-chronica font-bold text-lilian-purple uppercase tracking-wider">
              {SHOP_TEXTS.statusBadge}
            </span>
          </div>
        </div>

        {/* Main Editorial Headline */}
        <h1 className="font-chronica text-3xl sm:text-5xl lg:text-6xl font-bold text-lilian-purple mb-5 leading-[1.15]">
          <span>{SHOP_TEXTS.titleLine1}</span>
          <br />
          <span className="font-owl-cute text-lilian-orange text-5xl sm:text-7xl lg:text-8xl inline-block mx-2 drop-shadow-sm">
            {SHOP_TEXTS.titleHighlight}
          </span>
        </h1>

        {/* Warm Storytelling Subtitle */}
        <p className="font-gotham text-sm sm:text-base lg:text-lg text-lilian-purple/80 leading-relaxed max-w-2xl mx-auto mb-10">
          {SHOP_TEXTS.subtitle}
        </p>

        {/* Hero Cake Trio Display */}
        <div className="relative w-full max-w-2xl aspect-[2.3/1] mb-12 drop-shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-cream/60 to-transparent rounded-full blur-2xl -z-10" />
          <Image
            src={SHOP_ASSETS.heroCakes}
            alt="Pasteles Artesanales Panadería y Pastelería Lilian"
            fill
            className="object-contain group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            priority
          />
        </div>

        {/* Order Now Callout Box */}
        <div className="w-full bg-gradient-to-br from-lilian-purple via-[#321c59] to-lilian-purple-dark text-white rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden mb-12 border border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lilian-orange/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-lilian-teal/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto text-center">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-brand-gold font-chronica font-bold text-xs uppercase tracking-widest mb-3">
              Pedidos Inmediatos
            </span>
            <h2 className="font-chronica text-2xl sm:text-3xl font-bold mb-3 text-white">
              {SHOP_TEXTS.orderCardTitle}
            </h2>
            <p className="font-gotham text-xs sm:text-sm text-white/85 leading-relaxed mb-7">
              {SHOP_TEXTS.orderCardSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={SHOP_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-gradient-to-r from-lilian-teal to-lilian-teal-dark hover:brightness-110 text-white font-chronica font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                </svg>
                <span>{SHOP_TEXTS.whatsappButton}</span>
              </Link>

              <Link
                href={CTA.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-white text-lilian-purple hover:bg-[#fff9f2] font-chronica font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5"
              >
                <Image
                  src={SHOP_ASSETS.pedidosYaLogo}
                  alt=""
                  width={18}
                  height={18}
                  className="object-contain shrink-0"
                />
                <span>{SHOP_TEXTS.pedidosYaButton}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Brand Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full mb-10">
          {SHOP_TEXTS.perks.map((perk, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-left border border-lilian-purple/10 hover:border-lilian-orange/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-lilian-orange/10 flex items-center justify-center text-lilian-orange mb-3.5">
                  {perk.icon === "cake" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V4m0 0a2 2 0 100-4 2 2 0 000 4zm-7 8a4 4 0 018 0 4 4 0 018 0M5 12h14v9H5v-9z" />
                    </svg>
                  ) : perk.icon === "sparkles" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-chronica font-bold text-base text-lilian-purple mb-1.5">
                  {perk.title}
                </h3>
                <p className="font-gotham text-xs sm:text-sm text-lilian-purple/75 leading-relaxed">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home Link */}
        <Link
          href="/"
          className="text-xs sm:text-sm font-chronica font-semibold text-lilian-purple/70 hover:text-lilian-orange transition-colors flex items-center gap-2 py-2 px-4 rounded-full hover:bg-lilian-purple/5"
        >
          <span>{SHOP_TEXTS.backHome}</span>
        </Link>
      </div>
    </div>
  );
}
