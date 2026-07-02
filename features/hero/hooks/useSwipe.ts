"use client";

import { useCallback, useRef } from "react";

const SWIPE_THRESHOLD = 50;

export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0].screenX;
    touchEndX.current = null;
  }, []);

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    touchEndX.current = event.changedTouches[0].screenX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const distance = touchEndX.current - touchStartX.current;

    if (distance > SWIPE_THRESHOLD) {
      onSwipeRight();
    } else if (distance < -SWIPE_THRESHOLD) {
      onSwipeLeft();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [onSwipeLeft, onSwipeRight]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}
