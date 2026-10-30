import type { Metadata } from "next";
import AccountDashboard from "@/features/account/components/AccountDashboard";

export const metadata: Metadata = {
  title: "Mi cuenta - Panadería y Pastelería Lilian",
  description: "Administra tu perfil y direcciones en Lilian.",
};

export default function CuentaPage() {
  return <AccountDashboard />;
}
