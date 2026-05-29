"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function PageViewedEvent({ pageName }: { pageName: string }) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "page_viewed", page_name: pageName, page_id: pageName });
  }, [pageName]);

  return null;
}
