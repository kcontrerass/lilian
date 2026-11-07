import { BRANCHES_TEXTS } from "../constants";

interface BranchSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BranchSearch({ value, onChange }: BranchSearchProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center gap-3 rounded-full bg-white border border-lilian-purple/10 shadow-sm hover:border-lilian-orange/40 focus-within:border-lilian-orange focus-within:ring-4 focus-within:ring-lilian-orange/15 px-4 py-2.5 transition-all duration-200">
        <svg
          className="w-5 h-5 text-lilian-orange shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" strokeWidth="2" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <input
          id="branches-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={BRANCHES_TEXTS.searchPlaceholder}
          className="w-full bg-transparent outline-none font-gotham text-sm text-lilian-purple placeholder:text-lilian-purple/45"
          autoComplete="off"
          aria-label="Buscar sucursal"
        />

        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-chronica font-semibold text-lilian-purple/60 hover:text-lilian-orange shrink-0 cursor-pointer transition-colors"
            aria-label={BRANCHES_TEXTS.clearSearchLabel}
          >
            {BRANCHES_TEXTS.clearSearchLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
