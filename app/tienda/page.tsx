import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import FloatingChatButton from "@/components/FloatingChatButton";
import ShopSection from "@/features/shop/components/ShopSection";
import FooterSection from "@/features/footer/components/FooterSection";

export const metadata: Metadata = {
  title: "Tienda Online - Panadería y Pastelería Lilian",
  description:
    "Próximamente podrás comprar en línea nuestros deliciosos pasteles con variantes de tamaño pequeño, mediano y familiar.",
};

export default function TiendaPage() {
  return (
    <div className="relative min-h-screen bg-white text-lilian-purple font-gotham overflow-x-hidden flex flex-col justify-between">
      <Suspense>
        <Header />
      </Suspense>
      <main className="flex-grow">
        <ShopSection />
      </main>
      <FooterSection />
      <FloatingChatButton />
    </div>
  );
}
