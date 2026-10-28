import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import FloatingChatButton from "@/components/FloatingChatButton";
import CareersSection from "@/features/careers/components/CareersSection";
import FooterSection from "@/features/footer/components/FooterSection";

export const metadata: Metadata = {
  title: "Trabaja con Nosotros - Panadería y Pastelería Lilian",
  description:
    "Únete al equipo de Pastelería Lilian. Revisa nuestras plazas disponibles y envía tu postulación a Recursos Humanos.",
};

export default function TrabajaConNosotrosPage() {
  return (
    <div className="relative min-h-screen bg-white text-lilian-purple font-gotham overflow-x-hidden flex flex-col justify-between">
      <Suspense>
        <Header />
      </Suspense>
      <main className="flex-grow">
        <CareersSection />
      </main>
      <FooterSection />
      <FloatingChatButton />
    </div>
  );
}
