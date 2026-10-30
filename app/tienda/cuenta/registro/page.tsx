import type { Metadata } from "next";
import RegisterForm from "@/features/account/components/RegisterForm";
import ShopPageShell from "@/features/shop/components/ShopPageShell";
import { ACCOUNT_TEXTS } from "@/features/account/constants";

export const metadata: Metadata = {
  title: "Crear cuenta - Panadería y Pastelería Lilian",
  description: "Regístrate en la tienda Lilian.",
};

export default function RegistroPage() {
  return (
    <ShopPageShell breadcrumbs={[{ label: ACCOUNT_TEXTS.registerTitle }]}>
      <div className="max-w-md mx-auto shop-panel rounded-[28px] p-6 sm:p-8 shop-fade-up">
        <div className="text-center mb-8">
          <h1 className="font-chronica text-3xl sm:text-4xl font-bold text-lilian-purple mb-2">
            {ACCOUNT_TEXTS.registerTitle}
          </h1>
          <p className="font-gotham text-sm text-lilian-purple/70">
            {ACCOUNT_TEXTS.registerSubtitle}
          </p>
        </div>
        <RegisterForm />
      </div>
    </ShopPageShell>
  );
}
