"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MISSION_IMAGES, MISSION_TEXTS } from "../constants";
import { useInViewOnce } from "../hooks/useInViewOnce";

const MIN_SCALE = 0.35;
const MAX_SCALE = 2.5;
const SCALE_STEP = 0.15;
const DEFAULT_SCALE = 1;

export default function TimelineMapViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const [mounted, setMounted] = useState(false);
  const { ref: previewRef, inView: previewInView } = useInViewOnce("280px 0px");

  const close = useCallback(() => setIsOpen(false), []);

  const zoomIn = useCallback(() => {
    setScale((value) => Math.min(MAX_SCALE, Number((value + SCALE_STEP).toFixed(2))));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((value) => Math.max(MIN_SCALE, Number((value - SCALE_STEP).toFixed(2))));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, isOpen]);

  const previewSrc = MISSION_IMAGES.timelineMapPreview;
  const fullSrc = MISSION_IMAGES.timelineMapFull;
  const shouldLoadPreview = previewInView;

  const modal =
    isOpen && mounted ? (
      <div
        className="fixed inset-0 z-[9999] flex h-dvh w-full flex-col bg-lilian-purple overscroll-none"
        role="dialog"
        aria-modal="true"
        aria-label={MISSION_TEXTS.timelineMapDialogLabel}
      >
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5 sm:px-4 sm:py-3">
          <p className="font-chronica text-xs text-white/90 sm:text-sm w-full sm:w-auto">
            {MISSION_TEXTS.timelineMapDialogLabel}
          </p>
          <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
            <button
              type="button"
              onClick={zoomOut}
              disabled={scale <= MIN_SCALE}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg text-white disabled:opacity-40 hover:bg-white/25 cursor-pointer disabled:cursor-not-allowed"
              aria-label={MISSION_TEXTS.timelineMapZoomOutLabel}
            >
              −
            </button>
            <span className="min-w-[3.25rem] text-center text-xs font-chronica text-white/90">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={scale >= MAX_SCALE}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg text-white disabled:opacity-40 hover:bg-white/25 cursor-pointer disabled:cursor-not-allowed"
              aria-label={MISSION_TEXTS.timelineMapZoomInLabel}
            >
              +
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-full bg-lilian-orange px-4 py-2.5 text-xs font-chronica font-bold text-white hover:brightness-105 cursor-pointer"
            >
              {MISSION_TEXTS.timelineMapCloseLabel}
            </button>
          </div>
        </div>

        <p className="shrink-0 px-3 py-1.5 text-center text-[11px] font-gotham text-white/70 sm:hidden">
          {MISSION_TEXTS.timelineMapPanHint}
        </p>

        <div className="min-h-0 flex-1 overflow-auto overscroll-contain touch-pan-x touch-pan-y bg-lilian-purple">
          <div
            className="inline-block origin-top-left p-3 sm:p-6"
            style={{ transform: `scale(${scale})` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fullSrc}
              alt="Línea de tiempo de Pastelería Lilian ampliada"
              draggable={false}
              className="block h-auto w-auto max-w-none select-none"
            />
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setScale(DEFAULT_SCALE);
          setIsOpen(true);
        }}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-lilian-purple/10 bg-[#e8e8e8] text-left shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-lilian-orange/30"
        aria-label={MISSION_TEXTS.timelineMapOpenLabel}
      >
        <div ref={previewRef} className="w-full">
          {shouldLoadPreview ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={previewSrc}
              alt="Línea de tiempo de Pastelería Lilian desde 1979 hasta hoy"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="block h-auto w-full max-w-full"
            />
          ) : (
            <div
              className="flex aspect-[21/8] w-full items-center justify-center bg-lilian-purple/[0.06]"
              aria-hidden
            >
              <span className="text-xs font-gotham text-lilian-purple/50">Línea de tiempo</span>
            </div>
          )}
        </div>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-lilian-purple/90 px-3 py-1.5 text-xs font-chronica font-semibold text-white shadow-md sm:bottom-4 sm:right-4">
          {MISSION_TEXTS.timelineMapZoomHint}
        </span>
      </button>

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
