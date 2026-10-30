"use client";

import React, { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DEFAULT_CHECKOUT,
  SV_DEPARTMENTS,
  SHOP_ROUTES,
  SHOP_TEXTS,
} from "../constants";
import type { CheckoutFormValues } from "../types";
import { formatMinorAmount } from "../lib/formatPrice";
import { useCart } from "../context/CartContext";
import { useAuth } from "@/features/account/context/AuthContext";
import { ACCOUNT_ROUTES, ACCOUNT_TEXTS } from "@/features/account/constants";
import type { AuthUser } from "@/features/account/types";

const SV_CODES = new Set(SV_DEPARTMENTS.map((d) => d.code));

function valuesFromUser(user: AuthUser | null): CheckoutFormValues {
  if (!user) return { ...DEFAULT_CHECKOUT };
  const billing = user.billing;
  return {
    first_name: user.first_name || billing?.first_name || "",
    last_name: user.last_name || billing?.last_name || "",
    email: user.email || billing?.email || "",
    phone: billing?.phone || "",
    address_1: billing?.address_1 || "",
    address_2: billing?.address_2 || "",
    city: billing?.city || "",
    state:
      billing?.state && SV_CODES.has(billing.state)
        ? billing.state
        : DEFAULT_CHECKOUT.state,
    postcode: billing?.postcode || "",
    country: DEFAULT_CHECKOUT.country,
  };
}

function CheckoutFields({
  initialValues,
  userEmail,
  isAuthenticated,
}: {
  initialValues: CheckoutFormValues;
  userEmail?: string;
  isAuthenticated: boolean;
}) {
  const router = useRouter();
  const {
    cart,
    mutating,
    error,
    chooseShipping,
    placeOrder,
    clearError,
  } = useCart();
  const [values, setValues] = useState<CheckoutFormValues>(initialValues);

  if (!cart) return null;

  const shippingPackage = cart.shipping_rates[0];
  const rates = shippingPackage?.shipping_rates ?? [];

  const onChange =
    (field: keyof CheckoutFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      clearError();
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const order = await placeOrder(values);
    router.push(
      `${SHOP_ROUTES.orderReceived}?order=${encodeURIComponent(
        String(order.order_number || order.order_id),
      )}`,
    );
  };

  const fieldClass =
    "w-full rounded-xl border border-lilian-purple/15 bg-white px-3.5 py-2.5 text-sm font-gotham text-lilian-purple placeholder:text-lilian-purple/35 focus:outline-none focus:ring-2 focus:ring-lilian-orange/40 focus:border-lilian-orange/40";

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-4">
      {!isAuthenticated ? (
        <p className="rounded-xl bg-lilian-purple/5 px-3.5 py-2.5 text-xs font-gotham text-lilian-purple/75">
          {ACCOUNT_TEXTS.hasAccount}{" "}
          <Link
            href={`${ACCOUNT_ROUTES.login}?next=${encodeURIComponent(SHOP_ROUTES.checkout)}`}
            className="font-chronica font-semibold text-lilian-orange hover:underline"
          >
            {ACCOUNT_TEXTS.goLogin}
          </Link>
        </p>
      ) : (
        <p className="rounded-xl bg-lilian-teal/10 px-3.5 py-2.5 text-xs font-gotham text-lilian-teal-dark">
          Compra como {userEmail}. El pedido quedará en tu cuenta.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
          Nombre
          <input
            required
            name="first_name"
            value={values.first_name}
            onChange={onChange("first_name")}
            className={fieldClass}
            autoComplete="given-name"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
          Apellido
          <input
            required
            name="last_name"
            value={values.last_name}
            onChange={onChange("last_name")}
            className={fieldClass}
            autoComplete="family-name"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70 sm:col-span-2">
          Correo
          <input
            required
            type="email"
            name="email"
            value={values.email}
            onChange={onChange("email")}
            className={fieldClass}
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70 sm:col-span-2">
          Teléfono
          <input
            required
            type="tel"
            name="phone"
            value={values.phone}
            onChange={onChange("phone")}
            className={fieldClass}
            autoComplete="tel"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70 sm:col-span-2">
          Dirección
          <input
            required
            name="address_1"
            value={values.address_1}
            onChange={onChange("address_1")}
            className={fieldClass}
            autoComplete="address-line1"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70 sm:col-span-2">
          Interior / referencia
          <input
            name="address_2"
            value={values.address_2}
            onChange={onChange("address_2")}
            className={fieldClass}
            autoComplete="address-line2"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
          Ciudad
          <input
            required
            name="city"
            value={values.city}
            onChange={onChange("city")}
            className={fieldClass}
            autoComplete="address-level2"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70">
          C.P.
          <input
            required
            name="postcode"
            value={values.postcode}
            onChange={onChange("postcode")}
            className={fieldClass}
            autoComplete="postal-code"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-chronica font-semibold text-lilian-purple/70 sm:col-span-2">
          Departamento
          <select
            required
            name="state"
            value={values.state}
            onChange={onChange("state")}
            className={fieldClass}
          >
            {SV_DEPARTMENTS.map((dept) => (
              <option key={dept.code} value={dept.code}>
                {dept.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {rates.length > 0 ? (
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs font-chronica font-semibold text-lilian-purple/70 mb-1">
            {SHOP_TEXTS.shippingTitle}
          </legend>
          {rates.map((rate) => (
            <label
              key={rate.rate_id}
              className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 cursor-pointer transition-colors ${
                rate.selected
                  ? "border-lilian-orange bg-lilian-orange/5"
                  : "border-lilian-purple/10 hover:border-lilian-purple/25"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="shipping_rate"
                  checked={rate.selected}
                  disabled={mutating || !shippingPackage}
                  onChange={() => {
                    if (!shippingPackage) return;
                    void chooseShipping(shippingPackage.package_id, rate.rate_id);
                  }}
                  className="accent-lilian-orange"
                />
                <span className="font-gotham text-sm text-lilian-purple">
                  {rate.name}
                </span>
              </span>
              <span className="font-chronica font-bold text-sm text-lilian-purple">
                {formatMinorAmount(rate.price, rate)}
              </span>
            </label>
          ))}
        </fieldset>
      ) : null}

      <p className="rounded-xl bg-lilian-teal/10 text-lilian-teal-dark text-xs font-gotham px-3.5 py-2.5">
        {SHOP_TEXTS.paymentMethod}
      </p>

      {error ? (
        <p className="text-xs font-gotham text-lilian-pink" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-3 pt-1">
        <Link
          href={SHOP_ROUTES.cart}
          className="text-xs font-chronica font-semibold text-lilian-purple/60 hover:text-lilian-orange"
        >
          {SHOP_TEXTS.checkoutBack}
        </Link>
        <button
          type="submit"
          disabled={mutating || cart.items.length === 0}
          className="py-3.5 px-8 rounded-full bg-gradient-to-r from-lilian-teal to-lilian-teal-dark text-white font-chronica font-bold text-sm shadow-lg hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {mutating ? SHOP_TEXTS.checkoutSubmitting : SHOP_TEXTS.checkoutSubmit}
        </button>
      </div>
    </form>
  );
}

export default function CheckoutForm() {
  const { user, isAuthenticated } = useAuth();
  return (
    <CheckoutFields
      key={user?.id ?? "guest"}
      initialValues={valuesFromUser(user)}
      userEmail={user?.email}
      isAuthenticated={isAuthenticated}
    />
  );
}
