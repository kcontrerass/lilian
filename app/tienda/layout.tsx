import { Suspense } from "react";
import Header from "@/components/Header";
import FloatingChatButton from "@/components/FloatingChatButton";
import FooterSection from "@/features/footer/components/FooterSection";
export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#fdfbf7] text-lilian-purple font-gotham overflow-x-hidden flex flex-col justify-between">
      <Suspense>
        <Header />
      </Suspense>
      <main className="flex-grow">{children}</main>
      <FooterSection />
      <FloatingChatButton />
    </div>
  );
}
