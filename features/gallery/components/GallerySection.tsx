import GalleryGrid from "./GalleryGrid";

export default function GallerySection() {
  return (
    <section
      id="galeria"
      className="py-16 lg:py-24 px-4 w-full bg-white flex flex-col items-center"
    >
      <GalleryGrid />
    </section>
  );
}
