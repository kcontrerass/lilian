"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ACCOUNT_TEXTS } from "../constants";
import { useAuth } from "../context/AuthContext";
import type { AuthUser } from "../types";
import { SHOP_ROUTES } from "@/features/shop/constants";

export default function ProfileForm({ user }: { user: AuthUser }) {
  const { authenticating, error, saveProfile, clearError } = useAuth();
  const [saved, setSaved] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [billingAddress, setBillingAddress] = useState(
    user.billing?.address_1 || "",
  );
  const [billingCity, setBillingCity] = useState(user.billing?.city || "");
  const [billingPhone, setBillingPhone] = useState(user.billing?.phone || "");
  const [billingCountry, setBillingCountry] = useState(
    user.billing?.country || "SV",
  );
  const [shippingAddress, setShippingAddress] = useState(
    user.shipping?.address_1 || "",
  );
  const [shippingCity, setShippingCity] = useState(user.shipping?.city || "");
  const [shippingPhone, setShippingPhone] = useState(
    user.shipping?.phone || "",
  );
  const [shippingCountry, setShippingCountry] = useState(
    user.shipping?.country || "SV",
  );

  const fieldClass =
    "w-full rounded-xl border border-lilian-purple/15 bg-white px-3.5 py-2.5 text-sm font-gotham text-lilian-purple focus:outline-none focus:ring-2 focus:ring-lilian-orange/40";

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    clearError();
    setSaved(false);
    try {
      await saveProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        billing: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          address_1: billingAddress.trim(),
          city: billingCity.trim(),
          phone: billingPhone.trim(),
          country: billingCountry.trim() || "SV",
          email: user.email,
        },
        shipping: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          address_1: shippingAddress.trim(),
          city: shippingCity.trim(),
          phone: shippingPhone.trim(),
          country: shippingCountry.trim() || "SV",
        },
      });
      setSaved(true);
    } catch {
      // context error
    }
  };

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="shop-panel rounded-[28px] p-5 sm:p-7 max-w-2xl space-y-5 shop-fade-up shop-fade-up-delay-1"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
          {ACCOUNT_TEXTS.firstName}
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
          {ACCOUNT_TEXTS.lastName}
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={fieldClass}
          />
        </label>
      </div>

      <div>
        <h2 className="font-chronica font-bold text-base text-lilian-purple mb-3">
          {ACCOUNT_TEXTS.billingTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70 sm:col-span-2">
            {ACCOUNT_TEXTS.address}
            <input
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
            {ACCOUNT_TEXTS.city}
            <input
              value={billingCity}
              onChange={(e) => setBillingCity(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
            {ACCOUNT_TEXTS.phone}
            <input
              value={billingPhone}
              onChange={(e) => setBillingPhone(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
            {ACCOUNT_TEXTS.country}
            <input
              value={billingCountry}
              onChange={(e) => setBillingCountry(e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>
      </div>

      <div>
        <h2 className="font-chronica font-bold text-base text-lilian-purple mb-3">
          {ACCOUNT_TEXTS.shippingTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70 sm:col-span-2">
            {ACCOUNT_TEXTS.address}
            <input
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
            {ACCOUNT_TEXTS.city}
            <input
              value={shippingCity}
              onChange={(e) => setShippingCity(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
            {ACCOUNT_TEXTS.phone}
            <input
              value={shippingPhone}
              onChange={(e) => setShippingPhone(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
            {ACCOUNT_TEXTS.country}
            <input
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>
      </div>

      {error ? (
        <p className="text-xs font-gotham text-lilian-pink" role="alert">
          {error}
        </p>
      ) : null}
      {saved ? (
        <p className="text-xs font-gotham text-lilian-teal-dark">
          {ACCOUNT_TEXTS.profileSaved}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={authenticating}
          className="py-3 px-6 rounded-full bg-lilian-purple text-white font-chronica font-bold text-sm disabled:opacity-60 cursor-pointer"
        >
          {authenticating ? ACCOUNT_TEXTS.saving : ACCOUNT_TEXTS.saveProfile}
        </button>
        <Link
          href={SHOP_ROUTES.shop}
          className="py-3 px-6 rounded-full border border-lilian-purple/15 font-chronica font-semibold text-sm text-lilian-purple"
        >
          {ACCOUNT_TEXTS.continueShopping}
        </Link>
      </div>
    </form>
  );
}
