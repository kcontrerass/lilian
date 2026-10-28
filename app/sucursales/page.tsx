import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import FloatingChatButton from "@/components/FloatingChatButton";
import BranchesSection from "@/features/branches/components/BranchesSection";
import FooterSection from "@/features/footer/components/FooterSection";

export const metadata: Metadata = {
  title: "Sucursales - Panadería y Pastelería Lilian",
  description:
    "Encuentra la sucursal de Panadería y Pastelería Lilian más cercana a ti en San Salvador, La Libertad, Santa Ana y San Miguel.",
};

export default function SucursalesPage() {
  return (
    <div className="relative min-h-screen bg-white text-lilian-purple font-gotham overflow-x-hidden flex flex-col justify-between">
      <Suspense>
        <Header />
      </Suspense>
      <main className="flex-grow">
        <BranchesSection />
      </main>
      <FooterSection />
      <FloatingChatButton />
    </div>
  );
}
