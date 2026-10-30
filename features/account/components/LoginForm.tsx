"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ACCOUNT_ROUTES, ACCOUNT_TEXTS } from "../constants";
import { useAuth } from "../context/AuthContext";
import { SHOP_ROUTES } from "@/features/shop/constants";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, authenticating, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const next = searchParams.get("next") || ACCOUNT_ROUTES.root;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    clearError();
    try {
      await login(email.trim(), password);
      router.push(next);
    } catch {
      // error shown via context
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-lilian-purple/15 bg-white px-3.5 py-2.5 text-sm font-gotham text-lilian-purple focus:outline-none focus:ring-2 focus:ring-lilian-orange/40";

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
        {ACCOUNT_TEXTS.email}
        <input
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
        {ACCOUNT_TEXTS.password}
        <input
          required
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={fieldClass}
        />
      </label>

      {error ? (
        <p className="text-xs font-gotham text-lilian-pink" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={authenticating}
        className="w-full py-3.5 rounded-full bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-bold text-sm shadow-lg disabled:opacity-60 cursor-pointer"
      >
        {authenticating ? ACCOUNT_TEXTS.loggingIn : ACCOUNT_TEXTS.loginSubmit}
      </button>

      <p className="text-center text-sm font-gotham text-lilian-purple/70">
        {ACCOUNT_TEXTS.noAccount}{" "}
        <Link
          href={ACCOUNT_ROUTES.register}
          className="font-chronica font-semibold text-lilian-orange hover:underline"
        >
          {ACCOUNT_TEXTS.goRegister}
        </Link>
      </p>
      <Link
        href={SHOP_ROUTES.checkout}
        className="text-center text-xs font-chronica font-semibold text-lilian-purple/55 hover:text-lilian-orange"
      >
        {ACCOUNT_TEXTS.guestCheckout}
      </Link>
    </form>
  );
}
