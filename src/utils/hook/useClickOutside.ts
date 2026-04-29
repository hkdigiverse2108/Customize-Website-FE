import { useEffect, useRef, useState } from "react";

export const useClickOutside = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return; // skip adding listener when closed

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    // Use capture phase so it fires before any stopPropagation in child handlers
    document.addEventListener("mousedown", handleClickOutside, { capture: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, { capture: true });
    };
  }, [open]);

  return { open, setOpen, wrapperRef };
};
