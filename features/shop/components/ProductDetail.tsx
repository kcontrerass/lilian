"use client";

import { useEffect, useMemo, useState, startTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { SelectedAttributes, StoreProduct } from "../types";
import {
  CATEGORY_COLORS,
  SHOP_ROUTES,
  SHOP_TEXTS,
} from "../constants";
import { decodeHtmlEntities, stripHtml } from "../lib/formatPrice";
import ProductPrice from "./ProductPrice";
import {
  fetchProductBySlug,
  fetchProducts,
  fetchVariationsByParent,
  WooStoreError,
} from "../lib/wooStore";
import {
  findMatchingVariation,
  isVariableProduct,
  termLabelForSlug,
} from "../lib/variations";
import { useCart } from "../context/CartContext";
import ShopPageShell from "./ShopPageShell";
import ShopProductCard from "./ShopProductCard";
import VariationPicker from "./VariationPicker";

interface ProductDetailProps {
  slug?: string;
}

export default function ProductDetail({ slug: slugProp }: ProductDetailProps) {
  const params = useParams<{ slug: string }>();
  const slug = slugProp || params.slug;
  const { addItem, mutating } = useCart();
  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [variationDetails, setVariationDetails] = useState<StoreProduct[]>([]);
  const [related, setRelated] = useState<StoreProduct[]>([]);
  const [selected, setSelected] = useState<SelectedAttributes>({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    startTransition(() => {
      void (async () => {
        setLoading(true);
        setProduct(null);
        setError(null);
        setSelected({});
        setVariationDetails([]);
        setRelated([]);
        try {
          const next = await fetchProductBySlug(slug);
          if (cancelled) return;
          if (!next) {
            setError("Producto no encontrado.");
            setProduct(null);
            setLoading(false);
            return;
          }

          setProduct(next);
          setQuantity(next.add_to_cart.minimum || 1);

          const initial: SelectedAttributes = {};
          if (isVariableProduct(next)) {
            for (const attr of next.attributes ?? []) {
              if (attr.has_variations && attr.terms.length === 1) {
                initial[attr.name] = attr.terms[0].slug;
              }
            }
          }
          setSelected(initial);
          // Paint the product shell before secondary fetches finish.
          setLoading(false);

          const categoryId = next.categories[0]?.id;
          const secondary: Promise<void>[] = [];

          if (isVariableProduct(next) && (next.variations?.length ?? 0) > 0) {
            secondary.push(
              fetchVariationsByParent(next.id).then((details) => {
                if (!cancelled) setVariationDetails(details);
              }),
            );
          }

          if (categoryId) {
            secondary.push(
              fetchProducts({ category: categoryId, perPage: 4 }).then(
                (siblings) => {
                  if (!cancelled) {
                    setRelated(
                      siblings.filter((item) => item.id !== next.id).slice(0, 4),
                    );
                  }
                },
              ),
            );
          }

          await Promise.all(secondary);
        } catch (err) {
          if (cancelled) return;
          setError(
            err instanceof WooStoreError
              ? err.message
              : "No pudimos cargar el producto.",
          );
          setLoading(false);
        }
      })();
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const variable = product ? isVariableProduct(product) : false;

  const matchedVariation = useMemo(() => {
    if (!product || !variable) return null;
    return findMatchingVariation(product.variations, selected);
  }, [product, variable, selected]);

  const activeVariation = useMemo(() => {
    if (!matchedVariation) return null;
    return (
      variationDetails.find((item) => item.id === matchedVariation.id) ?? null
    );
  }, [matchedVariation, variationDetails]);

  const displayPrices = activeVariation?.prices ?? product?.prices;
  const displayImage =
    activeVariation?.images[0] ?? product?.images[0] ?? undefined;
  const canBuySimple =
    Boolean(product?.is_purchasable && product?.is_in_stock) && !variable;
  const canBuyVariation = Boolean(
    matchedVariation &&
      activeVariation?.is_purchasable &&
      activeVariation?.is_in_stock,
  );
  const canBuy = variable ? canBuyVariation : canBuySimple;
  const needsSelection = Boolean(
    product &&
      variable &&
      product.attributes
        .filter((attr) => attr.has_variations)
        .some((attr) => !selected[attr.name]),
  );

  const handleAdd = async () => {
    if (!product) return;
    const idToAdd = variable ? matchedVariation?.id : product.id;
    if (!idToAdd) return;
    setAdding(true);
    try {
      await addItem(idToAdd, quantity);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <ShopPageShell>
        <div className="rounded-3xl bg-lilian-purple/5 animate-pulse h-96" />
      </ShopPageShell>
    );
  }

  if (error || !product) {
    return (
      <ShopPageShell>
        <div className="text-center py-16 max-w-lg mx-auto">
          <p className="font-gotham text-sm text-lilian-pink mb-4">
            {error || "Producto no encontrado."}
          </p>
          <Link
            href={SHOP_ROUTES.shop}
            className="font-chronica font-semibold text-lilian-orange"
          >
            {SHOP_TEXTS.backToShop}
          </Link>
        </div>
      </ShopPageShell>
    );
  }

  const category = product.categories[0];
  const color = CATEGORY_COLORS[product.id % CATEGORY_COLORS.length];
  const description = stripHtml(
    product.description || product.short_description,
  );
  const productName = decodeHtmlEntities(product.name);
  const selectedSummary = matchedVariation
    ? matchedVariation.attributes
        .map(
          (attr) =>
            `${attr.name}: ${termLabelForSlug(product, attr.name, attr.value)}`,
        )
        .join(" · ")
    : "";

  return (
    <ShopPageShell
      breadcrumbs={[
        ...(category
          ? [
              {
                label: category.name,
                href: SHOP_ROUTES.category(category.slug),
              },
            ]
          : []),
        { label: productName },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-14 shop-fade-up">
        <div
          className={`relative aspect-square rounded-[32px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(61,36,106,0.45)] ${color}`}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff 1.5px, transparent 1.5px)",
              backgroundSize: "20px 20px",
            }}
          />
          {displayImage?.src ? (
            <Image
              src={displayImage.src}
              alt={displayImage.alt || productName}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-owl-cute text-white/90 text-8xl drop-shadow-md">
                {productName.charAt(0)}
              </span>
            </div>
          )}
          {(activeVariation?.on_sale ?? product.on_sale) ? (
            <span className="absolute top-4 left-4 z-10 rounded-full bg-lilian-pink text-white px-3 py-1.5 text-xs font-chronica font-bold uppercase tracking-wide shadow-md">
              {SHOP_TEXTS.onSaleBadge}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col shop-panel rounded-[32px] p-5 sm:p-7 lg:p-8">
          {category ? (
            <Link
              href={SHOP_ROUTES.category(category.slug)}
              className="text-[11px] uppercase tracking-[0.16em] font-chronica font-bold text-lilian-orange mb-3 hover:underline w-fit"
            >
              {category.name}
            </Link>
          ) : null}
          <h1 className="font-chronica text-3xl sm:text-4xl font-bold text-lilian-purple mb-3 leading-tight">
            {productName}
          </h1>
          {displayPrices ? (
            <ProductPrice prices={displayPrices} size="lg" className="mb-3" />
          ) : (
            <p className="font-chronica text-2xl font-bold text-lilian-orange mb-3">
              —
            </p>
          )}
          {selectedSummary ? (
            <p className="text-xs font-gotham text-lilian-purple/55 mb-4">
              {selectedSummary}
            </p>
          ) : null}
          {product.sku && !variable ? (
            <p className="text-xs font-gotham text-lilian-purple/50 mb-4">
              {SHOP_TEXTS.productSku}: {product.sku}
            </p>
          ) : null}
          {activeVariation?.sku ? (
            <p className="text-xs font-gotham text-lilian-purple/50 mb-4">
              {SHOP_TEXTS.productSku}: {activeVariation.sku}
            </p>
          ) : null}
          {description ? (
            <div className="mb-6 rounded-2xl bg-white/55 border border-lilian-purple/8 p-4">
              <h2 className="font-chronica font-bold text-sm text-lilian-purple mb-2">
                {SHOP_TEXTS.productDescription}
              </h2>
              <p className="font-gotham text-sm text-lilian-purple/75 leading-relaxed">
                {description}
              </p>
            </div>
          ) : null}

          {variable ? (
            <VariationPicker
              attributes={product.attributes}
              selected={selected}
              onChange={setSelected}
            />
          ) : null}

          {canBuy || needsSelection ? (
            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
              <div className="inline-flex items-center rounded-full border border-lilian-purple/12 bg-white overflow-hidden self-start shadow-sm">
                <button
                  type="button"
                  aria-label="Disminuir cantidad"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.max(product.add_to_cart.minimum || 1, q - 1),
                    )
                  }
                  className="w-11 h-11 text-lilian-purple hover:bg-lilian-purple/5 cursor-pointer"
                >
                  −
                </button>
                <span className="w-11 text-center font-chronica font-bold text-sm text-lilian-purple">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Aumentar cantidad"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.min(product.add_to_cart.maximum || 99, q + 1),
                    )
                  }
                  className="w-11 h-11 text-lilian-purple hover:bg-lilian-purple/5 cursor-pointer"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                disabled={mutating || adding || !canBuy}
                onClick={() => void handleAdd()}
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white font-chronica font-bold text-sm shadow-[0_16px_30px_-14px_rgba(239,111,40,0.9)] hover:brightness-105 disabled:opacity-60 cursor-pointer"
              >
                {adding
                  ? SHOP_TEXTS.adding
                  : needsSelection
                    ? SHOP_TEXTS.chooseOption
                    : SHOP_TEXTS.addToCart}
              </button>
            </div>
          ) : (
            <span className="inline-flex self-start py-3 px-6 rounded-full bg-lilian-purple/10 text-lilian-purple/50 font-chronica font-semibold text-sm">
              {SHOP_TEXTS.outOfStock}
            </span>
          )}
        </div>
      </div>

      {related.length > 0 ? (
        <div className="shop-fade-up shop-fade-up-delay-2">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="font-chronica text-2xl sm:text-3xl font-bold text-lilian-purple">
              {SHOP_TEXTS.relatedInCategory}
            </h2>
            <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-lilian-purple/15 to-transparent mb-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((item, index) => (
              <ShopProductCard
                key={item.id}
                product={item}
                colorIndex={index}
              />
            ))}
          </div>
        </div>
      ) : null}
    </ShopPageShell>
  );
}
