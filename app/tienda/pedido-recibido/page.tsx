import { Suspense } from "react";
import type { Metadata } from "next";
import OrderReceivedContent from "@/features/shop/components/OrderReceivedContent";

export const metadata: Metadata = {
  title: "Pedido recibido - Panadería y Pastelería Lilian",
  description: "Confirmación de tu pedido en Panadería y Pastelería Lilian.",
};

export default function PedidoRecibidoPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center font-gotham text-sm text-lilian-purple/60">
          Cargando…
        </div>
      }
    >
      <OrderReceivedContent />
    </Suspense>
  );
}
