"use client";

import { useEffect, useRef } from "react";
import { SEARCH_TEXTS } from "../constants";
import { useGlobalSearch } from "../hooks/useGlobalSearch";
import SearchResultsPanel from "./SearchResultsPanel";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    query,
    setQuery,
    groupedResults,
    hasQuery,
    hasResults,
  } = useGlobalSearch();

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, setQuery]);

  if (!open) {
    return null;
  }

  const handleSelect = () => {
    setQuery("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
      role="dialog"
      aria-modal="true"
      aria-label={SEARCH_TEXTS.dialogTitle}
    >
      <button
        type="button"
        className="absolute inset-0 bg-lilian-purple/55 backdrop-blur-sm"
        aria-label={SEARCH_TEXTS.closeLabel}
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-lilian-purple/10 bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-lilian-purple/10 px-4 py-3 sm:px-5 sm:py-4">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="text-lilian-orange shrink-0"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={SEARCH_TEXTS.placeholder}
            className="w-full bg-transparent border-none outline-none text-base sm:text-lg font-gotham text-lilian-purple placeholder-lilian-purple/45"
            aria-label={SEARCH_TEXTS.dialogTitle}
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-lilian-purple/50 hover:text-lilian-purple shrink-0"
              aria-label={SEARCH_TEXTS.clearLabel}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-lilian-purple/50 hover:bg-lilian-purple/5 hover:text-lilian-purple shrink-0"
            aria-label={SEARCH_TEXTS.closeLabel}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[min(60vh,28rem)] overflow-y-auto px-1 py-2">
          {!hasQuery ? (
            <p className="px-4 py-6 text-center text-sm font-gotham text-lilian-purple/50">
              {SEARCH_TEXTS.hint}
            </p>
          ) : (
            <SearchResultsPanel
              groupedResults={groupedResults}
              hasQuery={hasQuery}
              hasResults={hasResults}
              onSelect={handleSelect}
              variant="overlay"
            />
          )}
        </div>
      </div>
    </div>
  );
}
