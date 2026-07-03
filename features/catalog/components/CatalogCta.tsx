import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/lib/constants";

export default function CatalogCta() {
  return (
    <div className="mt-12 sm:mt-16 text-center w-full relative z-10">
      <Link
        href={CTA.href}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-gradient-to-r from-lilian-purple-dark via-lilian-purple to-lilian-purple-light text-white font-chronica font-medium text-[15px] sm:text-[16px] px-6 sm:px-8 py-3 rounded-full shadow-md hover:brightness-110 transition-all duration-200"
      >
        <Image
          src="/icon-pedidos.svg"
          alt=""
          width={17}
          height={16}
          aria-hidden="true"
        />
        {CTA.label}
      </Link>
    </div>
  );
}
