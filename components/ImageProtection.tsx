"use client";

import { useEffect } from "react";

export function ImageProtection() {
  useEffect(() => {
    const isImage = (target: EventTarget | null) => target instanceof HTMLImageElement;
    const block = (event: Event) => {
      if (isImage(event.target)) event.preventDefault();
    };
    const blockKeys = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && (key === "s" || key === "p")) event.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    document.addEventListener("keydown", blockKeys);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return null;
}
