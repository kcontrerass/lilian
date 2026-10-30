"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ACCOUNT_ROUTES, ACCOUNT_TEXTS } from "../constants";
import { useAuth } from "../context/AuthContext";
import AccountNav from "./AccountNav";
import ProfileForm from "./ProfileForm";
import ShopPageShell from "@/features/shop/components/ShopPageShell";

export default function AccountDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`${ACCOUNT_ROUTES.login}?next=${ACCOUNT_ROUTES.root}`);
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <ShopPageShell>
        <p className="text-center py-16 font-gotham text-sm text-lilian-purple/60">
          {ACCOUNT_TEXTS.loading}
        </p>
      </ShopPageShell>
    );
  }

  return (
    <ShopPageShell breadcrumbs={[{ label: ACCOUNT_TEXTS.accountTitle }]}>
      <div className="shop-fade-up mb-6">
        <h1 className="font-chronica text-3xl sm:text-4xl font-bold text-lilian-purple mb-2">
          {ACCOUNT_TEXTS.accountTitle}
        </h1>
        <p className="font-gotham text-sm text-lilian-purple/70">{user.email}</p>
      </div>

      <AccountNav />
      <ProfileForm key={user.id} user={user} />
    </ShopPageShell>
  );
}
