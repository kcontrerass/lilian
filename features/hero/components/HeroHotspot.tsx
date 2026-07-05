"use client";

import { useEffect, useRef, useState } from "react";
import HeroHotspotMarker from "./HeroHotspotMarker";
import HeroHotspotMessage from "./HeroHotspotMessage";
import { HotspotData } from "../types";

type HeroHotspotProps = {
  hotspot: HotspotData;
};

export default function HeroHotspot({ hotspot }: HeroHotspotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouchInteractionRef = useRef(false);
  const messageId = `hero-hotspot-${hotspot.id}`;
  const direction = hotspot.direction ?? "top";

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`absolute z-20 ${hotspot.top} ${hotspot.left}`}
    >
      <HeroHotspotMarker
        isOpen={isOpen}
        label={hotspot.label}
        descriptionId={messageId}
        onClick={() => setIsOpen((open) => !open)}
        onPointerDown={(event) => {
          isTouchInteractionRef.current = event.pointerType !== "mouse";
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setIsOpen(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setIsOpen(false);
        }}
        onFocus={() => {
          if (!isTouchInteractionRef.current) setIsOpen(true);
        }}
        onBlur={() => {
          if (!isTouchInteractionRef.current) setIsOpen(false);
        }}
      />
      <HeroHotspotMessage
        id={messageId}
        isOpen={isOpen}
        direction={direction}
        icon={hotspot.icon}
        label={hotspot.label}
      />
    </div>
  );
}
