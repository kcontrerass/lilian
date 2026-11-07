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
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap bg-[#9a3412] text-white font-chronica font-medium text-[16px] px-8 py-3 rounded-full shadow-md ${className}`}
    >
      <Image src="/assets/pedidosya.png" alt="PedidosYa" width={18} height={18} className="object-contain" />
      {label}
    </Link>
  );
}
