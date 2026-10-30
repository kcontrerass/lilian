import type { Metadata } from "next";
import OrdersList from "@/features/account/components/OrdersList";

export const metadata: Metadata = {
  title: "Mis pedidos - Panadería y Pastelería Lilian",
  description: "Consulta el historial de pedidos de tu cuenta Lilian.",
};

export default function PedidosPage() {
  return <OrdersList />;
}
