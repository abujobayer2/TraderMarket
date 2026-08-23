import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Pragmatic CSP: allows inline scripts/styles (needed for our JSON-LD
// <script> tags and Tailwind-in-JS, none of which use nonces yet) and
// cross-origin https images (firm logos + Google favicons are arbitrary
// domains). 'unsafe-eval' is dev-only, for Next/Turbopack's HMR runtime.
// fonts.googleapis.com/gstatic.com are allowed because the /widget preview
// runs the real widget.js on our own origin, and that script loads Google
// Fonts for the embedded card — without these, the preview silently drops
// the brand font on our own site (caught via a live CSP-violation check).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' https: data:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    // Every firm logoUrl is server-derived from faviconUrlFor() (see
    // src/lib/logo.ts) — always this exact host and path, never
    // user-supplied. Narrow enough to enable next/image's optimization
    // (WebP/AVIF, responsive sizing, lazy loading) without the SSRF/proxy
    // risk a wildcard-domain remotePattern would introduce.
    remotePatterns: [
      { protocol: "https", hostname: "www.google.com", pathname: "/s2/favicons/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
      {
        // widget.js must be embeddable/fetchable cross-origin by design —
        // it's meant to run on any firm's own site (see /api/widget CORS).
        source: "/widget.js",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

export default nextConfig;
