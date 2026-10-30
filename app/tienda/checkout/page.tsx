import type { Metadata } from "next";
import CheckoutPageContent from "@/features/shop/components/CheckoutPageContent";

export const metadata: Metadata = {
  title: "Checkout - Panadería y Pastelería Lilian",
  description: "Completa tus datos de entrega y confirma tu pedido.",
};

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
