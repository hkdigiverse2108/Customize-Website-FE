import { useEffect, useRef, useState } from "react";

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  // Keep a ref to the latest value so the timeout always closes over the current one
  const latestValue = useRef(value);
  latestValue.current = value;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(latestValue.current);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
