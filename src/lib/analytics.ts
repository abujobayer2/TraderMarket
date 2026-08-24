import type { DataFastWeb, CustomProperties } from "datafast";

let clientPromise: Promise<DataFastWeb> | null = null;

// Lazily initialized, memoized singleton — every caller (page views,
// custom event tracking) shares the same client instead of re-initializing.
export function getAnalytics(): Promise<DataFastWeb> {
  if (!clientPromise) {
    clientPromise = import("datafast").then(({ initDataFast }) =>
      initDataFast({
        websiteId: process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID!,
        domain: process.env.NEXT_PUBLIC_DATAFAST_DOMAIN,
        autoCapturePageviews: true,
      })
    );
  }
  return clientPromise;
}

export async function trackEvent(name: string, data?: CustomProperties) {
  if (!process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID) return;
  const analytics = await getAnalytics();
  analytics.track(name, data);
}
