"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  LAST_ORDER_STORAGE_KEY,
  SHOP_ROUTES,
  SHOP_TEXTS,
} from "../constants";
import type { CheckoutResult } from "../types";
import ShopPageShell from "./ShopPageShell";

function readStoredOrder(orderParam: string | null): CheckoutResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(LAST_ORDER_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CheckoutResult;
  } catch {
    // ignore
  }
  if (orderParam) {
    return {
      order_id: Number(orderParam) || 0,
      order_number: orderParam,
      status: "processing",
      payment_result: { payment_status: "success" },
    };
  }
  return null;
}

export default function OrderReceivedContent() {
  const searchParams = useSearchParams();
  const orderParam = searchParams.get("order");
  const [order] = useState(() => readStoredOrder(orderParam));

  return (
    <ShopPageShell breadcrumbs={[{ label: SHOP_TEXTS.breadcrumbOrder }]}>
      <div className="max-w-lg mx-auto text-center py-10 shop-panel rounded-[32px] px-6 sm:px-10 shop-fade-up">
        {order ? (
          <>
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-lilian-teal/15 text-lilian-teal flex items-center justify-center ring-8 ring-lilian-teal/10">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-chronica text-3xl sm:text-4xl font-bold text-lilian-purple mb-3">
              {SHOP_TEXTS.successTitle}
            </h1>
            <p className="font-gotham text-sm text-lilian-purple/75 mb-6">
              {SHOP_TEXTS.successSubtitle}
            </p>
            <div className="rounded-2xl bg-white/70 border border-lilian-purple/10 p-5 text-left space-y-2 mb-8">
              <p className="font-gotham text-sm text-lilian-purple/70">
                {SHOP_TEXTS.successOrder}:{" "}
                <span className="font-chronica font-bold text-lilian-purple">
                  #{order.order_number || order.order_id}
                </span>
              </p>
              <p className="font-gotham text-sm text-lilian-purple/70">
                {SHOP_TEXTS.successStatus}:{" "}
                <span className="font-chronica font-bold text-lilian-teal capitalize">
                  {order.status}
                </span>
              </p>
            </div>
            <Link
              href={SHOP_ROUTES.shop}
              className="inline-flex py-3.5 px-8 rounded-full bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-bold text-sm shadow-md"
            >
              {SHOP_TEXTS.successAgain}
            </Link>
          </>
        ) : (
          <>
            <h1 className="font-chronica text-2xl font-bold text-lilian-purple mb-3">
              {SHOP_TEXTS.breadcrumbOrder}
            </h1>
            <p className="font-gotham text-sm text-lilian-purple/70 mb-6">
              {SHOP_TEXTS.successMissing}
            </p>
            <Link
              href={SHOP_ROUTES.shop}
              className="font-chronica font-semibold text-lilian-orange"
            >
              {SHOP_TEXTS.backToShop}
            </Link>
          </>
        )}
      </div>
    </ShopPageShell>
  );
}
