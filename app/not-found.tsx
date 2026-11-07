import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import FooterSection from "@/features/footer/components/FooterSection";

export const metadata: Metadata = {
  title: "Página no encontrada | Lilian",
  description: "La dirección que buscas no existe o fue movida.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white font-gotham text-lilian-purple">
      <Suspense>
        <Header />
      </Suspense>
      <main id="contenido" className="flex flex-grow flex-col items-center justify-center gap-4 px-6 py-24 text-center">
        <h1 className="font-chronica text-3xl font-bold">Página no encontrada</h1>
        <p className="max-w-md text-sm text-lilian-purple/75">
          La dirección que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="rounded-full bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark px-6 py-3 text-sm font-chronica font-bold text-lilian-purple"
        >
          Volver al inicio
        </Link>
      </main>
      <FooterSection />
    </div>
  );
}
