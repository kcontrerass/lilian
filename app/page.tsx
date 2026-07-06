import Header from "@/components/Header";
import HeroSection from "@/features/hero/components/HeroSection";
import MissionSection from "@/features/mission/components/MissionSection";
import CatalogSection from "@/features/catalog/components/CatalogSection";
import GallerySection from "@/features/gallery/components/GallerySection";
import FooterSection from "@/features/footer/components/FooterSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-lilian-purple font-gotham overflow-x-hidden">
      <Header />
      <HeroSection />
      <MissionSection />
      <CatalogSection />
      <GallerySection />
      <FooterSection />
    </div>
  );
}
