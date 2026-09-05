import { Suspense } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { jsonLdScript } from "@/lib/jsonLd";
import { socialMetadata } from "@/lib/i18n/metadata";
import { ReviewsWidgetGenerator } from "./ReviewsWidgetGenerator";

const DESCRIPTION =
  "Embed your TraderMarket trader reviews on your own prop firm site. Nine widget styles — micro star, mini, card, quote, list, grid, carousel, and a review collector — free, auto-updating, and in the TraderMarket brand style.";

export const metadata = {
  title: "Reviews Widget",
  description: DESCRIPTION,
  alternates: { canonical: "/widget/reviews" },
  ...socialMetadata({
    path: "/widget/reviews",
    title: "Reviews Widget — TraderMarket",
    description: DESCRIPTION,
  }),
};

const faqs = [
  {
    q: "How do I add it to my site?",
    a: "Two lines: a placeholder <div class=\"tradermarket-reviews\"> where the widget should appear, and one <script async> anywhere on the page. The generator also outputs ready-made snippets for React, Next.js, Vue, PHP / WordPress, and a fully isolated <iframe> — pick your stack in the code panel.",
  },
  {
    q: "Is it fast?",
    a: "Yes. The loader is ~5 KB, loads asynchronously, and pulls no external fonts or CSS. It reserves the widget's space before rendering so there's no layout shift, and the rating response is cached at the edge for five minutes.",
  },
  {
    q: "Does it work with single-page apps and client-side routing?",
    a: "Yes. The loader watches the page and renders any widget added later by a router, so it works in React, Next.js, Vue, SvelteKit, Astro and similar without a wrapper. You can also call window.TraderMarketReviews.render() yourself after a route change.",
  },
  {
    q: "Where does the rating come from?",
    a: "It's the mean of every published trader review on your firm's TraderMarket reviews page. The widget re-fetches it on each page load, so it always matches what visitors see on TraderMarket. You can't edit the score or hand-pick the reviews — that's what keeps it a credible third-party signal.",
  },
  {
    q: "What happens before I have any reviews?",
    a: "Every widget except the Review Collector hides itself until your firm has at least one published review. The Review Collector is a call-to-action, so it works from day one.",
  },
  {
    q: "Will it restyle my site?",
    a: "No. Everything renders inside an isolated Shadow DOM, so its styles and your site's styles can't affect each other. The stars use the same squared brand-orange tiles as TraderMarket, in light and dark themes.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ReviewsWidgetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
            Reviews widget
          </p>
          <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
            Show your trader reviews on your own site
          </h1>
          <p className="mt-4 max-w-2xl text-[18px] leading-[27px] text-body">
            Generate a free embed that displays your live TraderMarket rating and reviews — the
            same idea as a Trustpilot widget, with nine styles to choose from, in the TraderMarket
            brand look. Copy-paste snippets for HTML, React, Next.js, Vue, PHP / WordPress, or an
            isolated iframe. It updates itself and links back to your reviews page.
          </p>

          <p className="mt-4 text-[15px] leading-[22px] text-body-mid">
            Want your leaderboard rank instead?{" "}
            <Link href="/widget" className="font-semibold text-ink hover:text-primary">
              Get the ranking badge →
            </Link>
          </p>

          <div className="mt-12">
            <Suspense>
              <ReviewsWidgetGenerator />
            </Suspense>
          </div>

          <div className="mt-20 border-t border-ink/10 pt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              The widget styles
            </h2>
            <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                ["Micro Star", "Just the star tiles and the TraderMarket wordmark — for a header or footer strip."],
                ["Micro Combo", "Score, stars, and review count on one line."],
                ["Mini", "A compact summary card: rating word, stars, and review count."],
                ["Card", "Summary card with your logo and a button through to your reviews."],
                ["Quote", "Your most recent review, featured on its own."],
                ["List", "The rating summary followed by a stack of recent reviews."],
                ["Grid", "The summary plus a responsive grid of review cards."],
                ["Carousel", "The summary with reviews that auto-rotate, with arrows and dots."],
                ["Review Collector", "A call-to-action that sends visitors straight to your review form."],
              ].map(([name, desc]) => (
                <div key={name}>
                  <dt className="text-[16px] font-semibold leading-[24px] text-ink">{name}</dt>
                  <dd className="text-[15px] leading-[22px] text-body">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-16 border-t border-ink/10 pt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Works with any stack
            </h2>
            <p className="mt-4 text-[16px] leading-[24px] text-body">
              One universal loader powers every integration. Pick the tab that matches your site in
              the code panel:
            </p>
            <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                ["HTML", "Placeholder div + one async <script>. Drops into any site, CMS, or page builder — Webflow, Squarespace, Framer, static HTML."],
                ["React", "A dependency-free <TraderMarketReviews /> component you paste in once and reuse anywhere."],
                ["Next.js", "next/script for the loader plus plain markup that works in Server or Client Components, App or Pages router."],
                ["Vue", "A single-file <TraderMarketReviews.vue> component, re-renders on prop change."],
                ["PHP / WordPress", "Inline markup for a template or Custom HTML block, plus a wp_enqueue_script snippet for functions.php."],
                ["iframe", "Maximum isolation — no JS runs on your page. Auto-resizes to its content. Good for locked-down or CSP-strict sites."],
              ].map(([name, desc]) => (
                <div key={name}>
                  <dt className="text-[16px] font-semibold leading-[24px] text-ink">{name}</dt>
                  <dd className="text-[15px] leading-[22px] text-body">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-16 border-t border-ink/10 pt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              How it works
            </h2>
            <ol className="mt-6 flex flex-col gap-4">
              {[
                "Pick your firm, a widget style, and a theme above.",
                "Choose your platform and copy the generated snippet.",
                "Paste it into your site — a placeholder element plus the loader (or a single iframe).",
                "It reserves space, fetches your live rating and reviews, and renders itself — no build step required.",
              ].map((step, i) => (
                <li key={step} className="flex gap-4 text-[16px] leading-[24px] text-body">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-canvas-soft text-[14px] font-semibold text-ink">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 border-t border-ink/10 pt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              FAQ
            </h2>
            <div className="mt-6 flex flex-col gap-6">
              {faqs.map((item) => (
                <div key={item.q}>
                  <p className="text-[16px] font-semibold leading-[24px] text-ink">{item.q}</p>
                  <p className="mt-1 text-[16px] leading-[24px] text-body">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
