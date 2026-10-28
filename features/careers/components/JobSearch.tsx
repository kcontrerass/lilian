import { CAREERS_TEXTS } from "../constants";

interface JobSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobSearch({ value, onChange }: JobSearchProps) {
  return (
    <div className="relative w-full max-w-xl">
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
          id="careers-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={CAREERS_TEXTS.searchPlaceholder}
          className="w-full bg-transparent outline-none font-gotham text-sm text-lilian-purple placeholder:text-lilian-purple/45"
          autoComplete="off"
        />

        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-chronica font-semibold text-lilian-purple/60 hover:text-lilian-orange shrink-0 cursor-pointer transition-colors"
            aria-label="Limpiar búsqueda"
          >
            Limpiar
          </button>
        ) : null}
      </div>
    </div>
  );
}
