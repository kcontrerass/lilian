import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/features/account/components/LoginForm";
import ShopPageShell from "@/features/shop/components/ShopPageShell";
import { ACCOUNT_TEXTS } from "@/features/account/constants";

export const metadata: Metadata = {
  title: "Iniciar sesión - Panadería y Pastelería Lilian",
  description: "Accede a tu cuenta Lilian.",
};

export default function IniciarSesionPage() {
  return (
    <ShopPageShell breadcrumbs={[{ label: ACCOUNT_TEXTS.loginTitle }]}>
      <div className="max-w-md mx-auto shop-panel rounded-[28px] p-6 sm:p-8 shop-fade-up">
        <div className="text-center mb-8">
          <h1 className="font-chronica text-3xl sm:text-4xl font-bold text-lilian-purple mb-2">
            {ACCOUNT_TEXTS.loginTitle}
          </h1>
          <p className="font-gotham text-sm text-lilian-purple/70">
            {ACCOUNT_TEXTS.loginSubtitle}
          </p>
        </div>
        <Suspense
          fallback={
            <p className="text-center text-sm text-lilian-purple/60">
              {ACCOUNT_TEXTS.loading}
            </p>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </ShopPageShell>
  );
}
