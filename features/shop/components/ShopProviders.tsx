"use client";

import type { ReactNode } from "react";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function ShopProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
