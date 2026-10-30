"use client";

import React, {
  createContext,
  use,
  useEffect,
  useRef,
  useState,
  startTransition,
  type ReactNode,
} from "react";
import type {
  CheckoutFormValues,
  CheckoutResult,
  StoreCart,
} from "../types";
import {
  DEFAULT_CHECKOUT,
  LAST_ORDER_STORAGE_KEY,
  PAYMENT_METHOD_COD,
} from "../constants";
import {
  addCartItem,
  checkoutOrder,
  fetchCart,
  removeCartItem,
  selectShippingRate,
  updateCartItem,
  updateCustomer,
  WooStoreError,
} from "../lib/wooStore";

interface CartContextValue {
  cart: StoreCart | null;
  loading: boolean;
  mutating: boolean;
  error: string | null;
  drawerOpen: boolean;
  lastOrder: CheckoutResult | null;
  openDrawer: () => void;
  closeDrawer: () => void;
  refreshCart: () => Promise<void>;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  setItemQuantity: (key: string, quantity: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  chooseShipping: (packageId: number, rateId: string) => Promise<void>;
  placeOrder: (values: CheckoutFormValues) => Promise<CheckoutResult>;
  clearError: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function persistOrder(order: CheckoutResult) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<StoreCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<CheckoutResult | null>(null);
  const bootstrapped = useRef(false);

  const refreshCart = async () => {
    const next = await fetchCart();
    setCart(next);
  };

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    startTransition(() => {
      void (async () => {
        try {
          await refreshCart();
        } catch (err) {
          setError(
            err instanceof WooStoreError
              ? err.message
              : "No pudimos cargar el carrito.",
          );
        } finally {
          setLoading(false);
        }
      })();
    });
  }, []);

  const runMutation = async (action: () => Promise<StoreCart>) => {
    setMutating(true);
    setError(null);
    try {
      const next = await action();
      setCart(next);
      return next;
    } catch (err) {
      const message =
        err instanceof WooStoreError
          ? err.message
          : "Ocurrió un error con el carrito.";
      setError(message);
      throw err;
    } finally {
      setMutating(false);
    }
  };

  const addItem = async (productId: number, quantity = 1) => {
    await runMutation(() => addCartItem(productId, quantity));
    setDrawerOpen(true);
  };

  const setItemQuantity = async (key: string, quantity: number) => {
    if (quantity < 1) {
      await runMutation(() => removeCartItem(key));
      return;
    }
    await runMutation(() => updateCartItem(key, quantity));
  };

  const removeItem = async (key: string) => {
    await runMutation(() => removeCartItem(key));
  };

  const chooseShipping = async (packageId: number, rateId: string) => {
    await runMutation(() => selectShippingRate(packageId, rateId));
  };

  const placeOrder = async (values: CheckoutFormValues) => {
    setMutating(true);
    setError(null);
    try {
      const billing = {
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
        company: "",
        address_1: values.address_1.trim(),
        address_2: values.address_2.trim(),
        city: values.city.trim(),
        state: values.state,
        postcode: values.postcode.trim(),
        country: values.country || DEFAULT_CHECKOUT.country,
        email: values.email.trim(),
        phone: values.phone.trim(),
      };
      const shipping = {
        first_name: billing.first_name,
        last_name: billing.last_name,
        company: "",
        address_1: billing.address_1,
        address_2: billing.address_2,
        city: billing.city,
        state: billing.state,
        postcode: billing.postcode,
        country: billing.country,
        phone: billing.phone,
      };

      await updateCustomer({
        billing_address: billing,
        shipping_address: shipping,
      });

      const refreshed = await fetchCart();
      setCart(refreshed);

      const pkg = refreshed.shipping_rates[0];
      const selected =
        pkg?.shipping_rates.find((rate) => rate.selected) ??
        pkg?.shipping_rates[0];
      if (pkg && selected && !selected.selected) {
        await selectShippingRate(pkg.package_id, selected.rate_id);
      }

      const order = await checkoutOrder({
        billing_address: billing,
        shipping_address: shipping,
        payment_method: PAYMENT_METHOD_COD,
      });

      setLastOrder(order);
      persistOrder(order);
      await refreshCart();
      return order;
    } catch (err) {
      const message =
        err instanceof WooStoreError
          ? err.message
          : "No se pudo completar el pedido.";
      setError(message);
      throw err;
    } finally {
      setMutating(false);
    }
  };

  const value: CartContextValue = {
    cart,
    loading,
    mutating,
    error,
    drawerOpen,
    lastOrder,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    refreshCart: async () => {
      setLoading(true);
      try {
        await refreshCart();
      } finally {
        setLoading(false);
      }
    },
    addItem,
    setItemQuantity,
    removeItem,
    chooseShipping,
    placeOrder,
    clearError: () => setError(null),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const value = use(CartContext);
  if (!value) {
    throw new Error("useCart must be used within CartProvider");
  }
  return value;
}
