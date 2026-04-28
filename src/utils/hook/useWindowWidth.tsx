import { useEffect, useRef, useState, useCallback } from "react";

export const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(() => (typeof window !== "undefined" ? window.innerWidth : 0));

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleResize = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setWidth(window.innerWidth);
    }, 100);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [handleResize]);

  return width;
};
