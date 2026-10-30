import type {
  CartItemVariation,
  SelectedAttributes,
  StoreProduct,
  StoreVariationRef,
} from "../types";

export function isVariableProduct(product: StoreProduct): boolean {
  return (
    product.type === "variable" ||
    Boolean(product.has_options) ||
    (product.variations?.length ?? 0) > 0
  );
}

export function findMatchingVariation(
  variations: StoreVariationRef[],
  selected: SelectedAttributes,
): StoreVariationRef | null {
  if (!variations.length) return null;

  const selectedNames = Object.keys(selected).filter((name) => selected[name]);
  if (selectedNames.length === 0) return null;

  return (
    variations.find((variation) => {
      if (variation.attributes.length !== selectedNames.length) {
        // still match if all variation attrs are selected (extra keys ok)
      }
      return variation.attributes.every((attr) => {
        const chosen = selected[attr.name];
        if (!chosen) return false;
        return chosen.toLowerCase() === attr.value.toLowerCase();
      });
    }) ?? null
  );
}

export function formatCartVariation(
  variation: CartItemVariation[] | undefined,
): string {
  if (!variation?.length) return "";
  return variation.map((item) => `${item.attribute}: ${item.value}`).join(" · ");
}

export function termLabelForSlug(
  product: StoreProduct,
  attributeName: string,
  slug: string,
): string {
  const attribute = product.attributes.find((attr) => attr.name === attributeName);
  const term = attribute?.terms.find(
    (item) => item.slug === slug || item.name === slug,
  );
  return term?.name ?? slug;
}
