import type { Metadata } from "next";
import CartPageContent from "@/features/shop/components/CartPageContent";

export const metadata: Metadata = {
  title: "Carrito - Panadería y Pastelería Lilian",
  description: "Revisa los productos de tu carrito antes de completar el pedido.",
};

export default function CarritoPage() {
  return <CartPageContent />;
}
