import Image from "next/image";
import Link from "next/link";

type CtaButtonProps = {
  href: string;
  label: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function CtaButton({
  href,
  label,
  external = false,
  onClick,
  className = "",
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap bg-lilian-orange-dark text-white font-chronica font-medium text-[16px] px-8 py-3 rounded-full shadow-md ${className}`}
    >
      <Image src="/icon-pedidos.svg" alt="" width={17} height={16} aria-hidden="true" />
      {label}
    </Link>
  );
}
