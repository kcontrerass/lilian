"use client";

import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/constants";

export default function FloatingChatButton() {
  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-lilian-teal"
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[93px] md:h-[93px] flex items-center justify-center">
        {/* Pulse effect */}
        <div className="absolute inset-4 rounded-full bg-lilian-teal/20 animate-ping opacity-75 group-hover:animate-none" />

        {/* Background circle SVG with backdrop-blur */}
        <Image
          src="/assets/bd9ed364ab275ad7c2633bf7b6625e2ca95c01ff.svg"
          alt=""
          fill
          className="object-contain transition-transform duration-300 group-hover:rotate-12"
          priority
        />
        {/* Inner Chat Icon SVG */}
        <div className="relative w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] md:w-[45px] md:h-[45px]">
          <Image
            src="/assets/63c2ae5ee5429866abeafe233d7fd40ec5839bee.svg"
            alt="Chat"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </Link>
  );
}
