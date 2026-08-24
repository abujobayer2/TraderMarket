"use client";

import { useEffect } from "react";
import { getAnalytics } from "@/lib/analytics";

export function Analytics() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID) return;
    getAnalytics();
  }, []);

  return null;
}
