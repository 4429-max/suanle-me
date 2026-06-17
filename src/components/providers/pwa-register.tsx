"use client";

import { useEffect } from "react";
import { siteAssetPath } from "@/lib/site";

export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_DISABLE_SW === "true") {
      return;
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(siteAssetPath("/sw.js")).catch(() => {
        // PWA registration is progressive enhancement; the app still works without it.
      });
    }
  }, []);

  return null;
}
