// src/app/components/VisitorTracker.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Prevent spam: only fire once per session per page
    const key = `portfolio:viewed:${pathname}`;
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true, // helps send even if user navigates away quickly
    }).catch(() => {
      // ignore errors (don’t break UI)
    });
  }, [pathname]);

  return null;
}
