import type { Metadata } from "next";
import ShopSection from "@/features/shop/components/ShopSection";

export const metadata: Metadata = {
  title: "Tienda Online - Panadería y Pastelería Lilian",
  description:
    "Compra en línea pan dulce, pan salado, pasteles y bebidas. Pago contra entrega.",
};

export default function TiendaPage() {
  return <ShopSection />;
}
