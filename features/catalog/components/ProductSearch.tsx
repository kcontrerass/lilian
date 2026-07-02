import { CATALOG_TEXTS } from "../constants";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="w-full max-w-[800px] mx-auto mb-16 px-4">
      <div className="flex items-center gap-4 border-b border-[#df8d40] pb-2">
        <div className="w-[45px] h-[45px] rounded-full bg-[#fcf2ea] flex items-center justify-center shrink-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#df8d40"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <input
          type="text"
          placeholder={CATALOG_TEXTS.searchPlaceholder}
          className="w-full bg-transparent outline-none font-gotham text-[16px] text-lilian-purple placeholder-lilian-purple/50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button className="bg-lilian-purple text-white px-8 py-2.5 rounded-[100px] font-gotham font-medium text-[15px] shrink-0 hover:bg-lilian-purple-light transition-colors">
          {CATALOG_TEXTS.searchButton}
        </button>
      </div>
    </div>
  );
}
