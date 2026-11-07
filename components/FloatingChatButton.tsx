"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "@/lib/constants";

function isFormField(node: EventTarget | null): boolean {
  return node instanceof HTMLElement && Boolean(node.closest("input, textarea, select"));
}

export default function FloatingChatButton() {
  const [hiddenWhileTyping, setHiddenWhileTyping] = useState(false);

  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      if (isFormField(event.target)) setHiddenWhileTyping(true);
    };

    const onFocusOut = () => {
      requestAnimationFrame(() => {
        setHiddenWhileTyping(isFormField(document.activeElement));
      });
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-4 right-4 z-40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-lilian-teal sm:bottom-6 sm:right-6 sm:z-50 ${
        hiddenWhileTyping ? "pointer-events-none opacity-0" : ""
      }`}
      aria-label="Contactar por WhatsApp"
      aria-hidden={hiddenWhileTyping}
      tabIndex={hiddenWhileTyping ? -1 : undefined}
    >
      <div className="relative flex h-14 w-14 items-center justify-center sm:h-20 sm:w-20 md:h-[93px] md:w-[93px]">
        <div className="absolute inset-4 rounded-full bg-lilian-teal/20 animate-ping opacity-75 group-hover:animate-none" />

        <Image
          src="/assets/bd9ed364ab275ad7c2633bf7b6625e2ca95c01ff.svg"
          alt="Fondo del botón de WhatsApp"
          fill
          className="object-contain transition-transform duration-300 group-hover:rotate-12"
          priority
        />
        <div className="relative h-7 w-7 sm:h-[38px] sm:w-[38px] md:h-[45px] md:w-[45px]">
          <Image
            src="/assets/63c2ae5ee5429866abeafe233d7fd40ec5839bee.svg"
            alt="WhatsApp"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </Link>
  );
}
