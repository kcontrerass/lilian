"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = {
  src: string;
  poster?: string;
  isActive: boolean;
};

export default function HeroVideo({ src, poster, isActive }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {
        // Autoplay may be blocked by browser policies; ignore error.
      });
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
      aria-label="Video de fondo"
    />
  );
}
