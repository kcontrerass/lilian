"use client";

import { useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ACCOUNT_ROUTES, ACCOUNT_TEXTS } from "../constants";
import { useAuth } from "../context/AuthContext";
import { fetchMyOrders, AuthApiError } from "../lib/authApi";
import type { CustomerOrder } from "../types";
import AccountNav from "./AccountNav";
import ShopPageShell from "@/features/shop/components/ShopPageShell";
import { SHOP_ROUTES } from "@/features/shop/constants";

export default function OrdersList() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(`${ACCOUNT_ROUTES.login}?next=${ACCOUNT_ROUTES.orders}`);
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    startTransition(() => {
      void (async () => {
        setLoading(true);
        setError(null);
        try {
          const next = await fetchMyOrders();
          if (!cancelled) setOrders(next);
        } catch (err) {
          if (!cancelled) {
            setError(
              err instanceof AuthApiError
                ? err.message
                : "No pudimos cargar tus pedidos.",
            );
          }
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (authLoading || !user) {
    return (
      <ShopPageShell>
        <p className="text-center py-16 font-gotham text-sm text-lilian-purple/60">
          {ACCOUNT_TEXTS.loading}
        </p>
      </ShopPageShell>
    );
  }

  return (
    <ShopPageShell
      breadcrumbs={[
        { label: ACCOUNT_TEXTS.accountTitle, href: ACCOUNT_ROUTES.root },
        { label: ACCOUNT_TEXTS.ordersTitle },
      ]}
    >
      <h1 className="font-chronica text-3xl sm:text-4xl font-bold text-lilian-purple mb-6 shop-fade-up">
        {ACCOUNT_TEXTS.ordersTitle}
      </h1>
      <AccountNav />

      {loading ? (
        <div className="rounded-[28px] shop-panel animate-pulse h-40" />
      ) : null}

      {!loading && error ? (
        <p className="text-sm font-gotham text-lilian-pink" role="alert">
          {error}
        </p>
      ) : null}

      {!loading && !error && orders.length === 0 ? (
        <div className="text-center py-16 rounded-[28px] shop-panel max-w-lg mx-auto shop-fade-up">
          <p className="font-gotham text-sm text-lilian-purple/70 mb-6">
            {ACCOUNT_TEXTS.ordersEmpty}
          </p>
          <Link
            href={SHOP_ROUTES.shop}
            className="inline-flex py-3 px-6 rounded-full bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-bold text-sm shadow-md"
          >
            {ACCOUNT_TEXTS.continueShopping}
          </Link>
        </div>
      ) : null}

      {!loading && orders.length > 0 ? (
        <ul className="flex flex-col gap-4 max-w-3xl shop-fade-up shop-fade-up-delay-1">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-[24px] shop-panel p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <p className="font-chronica font-bold text-lilian-purple">
                    {ACCOUNT_TEXTS.orderNumber} #
                    {order.number || order.id}
                  </p>
                  {order.date_created ? (
                    <p className="text-xs font-gotham text-lilian-purple/55 mt-1">
                      {ACCOUNT_TEXTS.orderDate}:{" "}
                      {new Date(order.date_created).toLocaleDateString("es")}
                    </p>
                  ) : null}
                </div>
                <div className="text-right">
                  <p className="text-xs font-chronica font-semibold uppercase tracking-wide text-lilian-teal">
                    {order.status}
                  </p>
                  {order.total ? (
                    <p className="font-chronica font-bold text-lilian-orange mt-1">
                      {order.currency ? `${order.currency} ` : "$"}
                      {order.total}
                    </p>
                  ) : null}
                </div>
              </div>
              {order.line_items?.length ? (
                <ul className="mt-3 space-y-1 border-t border-lilian-purple/8 pt-3">
                  {order.line_items.map((item) => (
                    <li
                      key={item.id}
                      className="text-sm font-gotham text-lilian-purple/75 flex justify-between gap-3"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="shrink-0 font-chronica font-semibold">
                        {item.total}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </ShopPageShell>
  );
}
