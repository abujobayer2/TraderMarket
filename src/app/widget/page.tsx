import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { jsonLdScript } from "@/lib/jsonLd";
import { WidgetGenerator } from "./WidgetGenerator";

export const metadata = {
  title: "Ranking Widget",
  description:
    "Embed a live TraderMarket ranking badge on your prop firm's website. Free, auto-updating, and links straight to your profile.",
  alternates: { canonical: "/widget" },
};

const faqs = [
  {
    q: "Does the badge update automatically?",
    a: "Yes. The badge fetches your current rank from TraderMarket every time your page loads. If you get outbid, the badge shows your new rank the next time someone visits your site — no code changes needed.",
  },
  {
    q: "Can I edit the rank or text it shows?",
    a: "No. The rank always reflects your live TraderMarket position so it stays a credible, third-party signal rather than a claim you control.",
  },
  {
    q: "Will it slow down my site?",
    a: "No. The script is a few KB, loads asynchronously, and renders inside an isolated Shadow DOM so it can't conflict with your site's styles.",
  },
  {
    q: "Do I need to be ranked #1 to use it?",
    a: "No — any active listing can embed the badge, whatever rank it currently holds.",
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

export default function WidgetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
            Ranking widget
          </p>
          <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
            Put your live rank on your own site
          </h1>
          <p className="mt-4 max-w-2xl text-[18px] leading-[27px] text-body">
            Generate a free embed badge that shows your current TraderMarket rank —
            like a Trustpilot widget, but for leaderboard position. It updates itself
            automatically and links back to your profile.
          </p>

          <div className="mt-12">
            <Suspense>
              <WidgetGenerator />
            </Suspense>
          </div>

          <div className="mt-20 border-t border-ink/10 pt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              How it works
            </h2>
            <ol className="mt-6 flex flex-col gap-4">
              {[
                "Pick your firm, a style, and a theme above.",
                "Copy the generated <script> tag.",
                "Paste it anywhere in your website's HTML.",
                "The badge fetches your live rank and renders itself — no build step, no framework required.",
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
