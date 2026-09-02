import { NextRequest } from "next/server";

// Standalone HTML document for the <iframe> embed method — the most isolated,
// most compatible way to drop the widget onto any stack (PHP, WordPress,
// Webflow, plain HTML, email-style CMSes). It loads the same loader script and
// posts its rendered height to the parent so the iframe can size itself.

const VALID_VARIANTS = [
  "micro-star",
  "micro-count",
  "mini",
  "card",
  "quote",
  "list",
  "grid",
  "carousel",
  "collector",
];
const SLUG_PATTERN = /^[a-z0-9-]{1,80}$/;

function esc(s: string) {
  return s.replace(/[&<>"']/g, (ch) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]!;
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUG_PATTERN.test(slug)) {
    return new Response("Not found", { status: 404 });
  }

  const q = req.nextUrl.searchParams;
  const variant = VALID_VARIANTS.includes(q.get("variant") || "") ? q.get("variant")! : "mini";
  const theme = q.get("theme") === "dark" ? "dark" : "light";
  const reviews = q.get("reviews");
  const base = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;

  const attrs = [
    `data-firm="${esc(slug)}"`,
    `data-variant="${variant}"`,
    `data-theme="${theme}"`,
    reviews && /^\d{1,2}$/.test(reviews) ? `data-reviews="${reviews}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>TraderMarket reviews</title>
<style>html,body{margin:0;padding:0;background:transparent}body{overflow:hidden}</style>
</head>
<body>
<div class="tradermarket-reviews" ${attrs}></div>
<script src="${esc(base)}/reviews-widget.js" async></script>
<script>
(function () {
  var last = 0;
  function send() {
    var h = document.documentElement.scrollHeight;
    if (h === last) return;
    last = h;
    try {
      parent.postMessage({ type: "tm-reviews-resize", height: h }, "*");
    } catch (e) {}
  }
  if (window.ResizeObserver) new ResizeObserver(send).observe(document.body);
  window.addEventListener("load", send);
  [120, 400, 900, 2000].forEach(function (t) { setTimeout(send, t); });
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
    },
  });
}
