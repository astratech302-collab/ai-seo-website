"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import CalendlyModal from "@/components/demo/CalendlyModal";

const BookDemoContext = createContext(null);

/**
 * Wraps the app and mounts a single Calendly modal. Any descendant can call
 * `useBookDemo().openDemo()` (e.g. the BookDemoButton) to open it.
 */
export function BookDemoProvider({ children }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      openDemo: () => setOpen(true),
      closeDemo: () => setOpen(false),
    }),
    [open]
  );

  return (
    <BookDemoContext.Provider value={value}>
      {children}
      <CalendlyModal open={open} onOpenChange={setOpen} />
    </BookDemoContext.Provider>
  );
}

export function useBookDemo() {
  const ctx = useContext(BookDemoContext);
  if (!ctx) {
    throw new Error("useBookDemo must be used within <BookDemoProvider>");
  }
  return ctx;
}
