"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ACCOUNT_ROUTES, ACCOUNT_TEXTS } from "../constants";
import { useAuth } from "../context/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { register, authenticating, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    clearError();
    try {
      await register({
        email: email.trim(),
        password,
        first_name: firstName.trim() || undefined,
        last_name: lastName.trim() || undefined,
      });
      router.push(ACCOUNT_ROUTES.root);
    } catch {
      // error via context
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-lilian-purple/15 bg-white px-3.5 py-2.5 text-sm font-gotham text-lilian-purple focus:outline-none focus:ring-2 focus:ring-lilian-orange/40";

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
          {ACCOUNT_TEXTS.firstName}
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass}
            autoComplete="given-name"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
          {ACCOUNT_TEXTS.lastName}
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={fieldClass}
            autoComplete="family-name"
          />
        </label>
      </div>
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
          autoComplete="new-password"
          minLength={6}
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
        className="w-full py-3.5 rounded-full bg-gradient-to-r from-lilian-teal to-lilian-teal-dark text-white font-chronica font-bold text-sm shadow-lg disabled:opacity-60 cursor-pointer"
      >
        {authenticating
          ? ACCOUNT_TEXTS.registering
          : ACCOUNT_TEXTS.registerSubmit}
      </button>

      <p className="text-center text-sm font-gotham text-lilian-purple/70">
        {ACCOUNT_TEXTS.hasAccount}{" "}
        <Link
          href={ACCOUNT_ROUTES.login}
          className="font-chronica font-semibold text-lilian-orange hover:underline"
        >
          {ACCOUNT_TEXTS.goLogin}
        </Link>
      </p>
    </form>
  );
}
