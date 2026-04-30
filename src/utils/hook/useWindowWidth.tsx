import { useEffect, useState } from "react";

// Shared resize observer across all hook instances — far cheaper than N listeners
const listeners = new Set<() => void>();
let rafId: number | null = null;

const getWidth = () => (typeof window !== "undefined" ? window.innerWidth : 0);

const scheduleNotify = () => {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    listeners.forEach((fn) => fn());
  });
}

if (typeof window !== "undefined") {
  window.addEventListener("resize", scheduleNotify, { passive: true });
}

export const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(getWidth);

  useEffect(() => {
    // Capture the latest value in case a resize fired before mount
    setWidth(getWidth());

    const handler = () => setWidth(getWidth());
    listeners.add(handler);

    return () => {
      listeners.delete(handler);
    };
  }, []);

  return width;
};
