"use client";

import type { SelectedAttributes, StoreAttribute } from "../types";
import { SHOP_TEXTS } from "../constants";

interface VariationPickerProps {
  attributes: StoreAttribute[];
  selected: SelectedAttributes;
  onChange: (next: SelectedAttributes) => void;
}

export default function VariationPicker({
  attributes,
  selected,
  onChange,
}: VariationPickerProps) {
  const variationAttrs = attributes.filter(
    (attr) => attr.has_variations && attr.terms.length > 0,
  );

  if (variationAttrs.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 mb-6">
      {variationAttrs.map((attr) => (
        <fieldset key={attr.id || attr.name} className="flex flex-col gap-2">
          <legend className="text-xs font-chronica font-bold uppercase tracking-wider text-lilian-purple/70">
            {attr.name}
          </legend>
          <div className="flex flex-wrap gap-2">
            {attr.terms.map((term) => {
              const isActive = selected[attr.name] === term.slug;
              return (
                <button
                  key={term.id || term.slug}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...selected,
                      [attr.name]: term.slug,
                    })
                  }
                  className={`py-2.5 px-4 rounded-full text-sm font-chronica font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-lilian-purple text-white shadow-[0_10px_20px_-12px_rgba(61,36,106,0.8)]"
                      : "bg-white/80 border border-lilian-purple/12 text-lilian-purple hover:border-lilian-orange/40 hover:bg-white"
                  }`}
                >
                  {term.name}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
      {variationAttrs.some((attr) => !selected[attr.name]) ? (
        <p className="text-xs font-gotham text-lilian-purple/55">
          {SHOP_TEXTS.selectVariationHint}
        </p>
      ) : null}
    </div>
  );
}
