import Image from "next/image";
import { GALLERY_IMAGES } from "../constants";

const GRID_LAYOUTS = [
  // grid_1: left column, spans 2 rows on lg
  "lg:col-start-1 lg:row-span-2 lg:row-start-1 aspect-[4/3] lg:aspect-auto",
  // grid_2: middle top
  "lg:col-start-2 lg:row-start-1 aspect-[4/3] lg:aspect-auto",
  // grid_3: right top
  "lg:col-start-3 lg:row-start-1 aspect-[4/3] lg:aspect-auto",
  // grid_4: middle bottom
  "lg:col-start-2 lg:row-start-2 aspect-[4/3] lg:aspect-auto",
  // grid_5: right bottom
  "lg:col-start-3 lg:row-start-2 aspect-[4/3] lg:aspect-auto",
];

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-2 w-full max-w-full auto-rows-fr lg:h-[700px] relative z-10">
      {GALLERY_IMAGES.map((image, index) => (
        <div
          key={image.src}
          className={`relative overflow-hidden rounded-none ${GRID_LAYOUTS[index]}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
