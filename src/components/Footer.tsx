import Link from "next/link";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n/locales";

export type FooterCopy = {
  tagline: string;
  leaderboard: string;
  rankings: string;
  reviews: string;
  guide: string;
  forex: string;
  futures: string;
  crypto: string;
  byCountry: string;
  listYourFirm: string;
  rules: string;
  widget: string;
};

const EN_FOOTER_COPY: FooterCopy = {
  tagline: "The public leaderboard where prop firms compete for visibility.",
  leaderboard: "Leaderboard",
  rankings: "Rankings",
  reviews: "Reviews",
  guide: "Funded Programs Guide",
  forex: "Forex",
  futures: "Futures",
  crypto: "Crypto",
  byCountry: "By Country",
  listYourFirm: "List your firm",
  rules: "Rules",
  widget: "Widget",
};

// `locale`/`copy` are only passed by the translated (/[lang]/...) pages —
// every existing English page keeps calling <Footer /> with no props.
// `switcher`, when passed, renders a page-aware language-switcher row.
export function Footer({
  locale,
  copy,
  switcher,
}: {
  locale?: Locale;
  copy?: FooterCopy;
  switcher?: { path: string; availableLocales: Locale[] };
} = {}) {
  const prefix = locale ? `/${locale}` : "";
  const t = copy ?? EN_FOOTER_COPY;

  return (
    <footer className="bg-ink px-6 py-12 text-canvas-soft">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <Logo invert />
          <p className="mt-2 text-[16px] text-canvas-soft/70">{t.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[16px]">
          <Link href={`${prefix}/#leaderboard`} className="hover:text-canvas">
            {t.leaderboard}
          </Link>
          <Link href={`${prefix}/best-prop-trading-firms`} className="hover:text-canvas">
            {t.rankings}
          </Link>
          <Link href={`${prefix}/prop-firm-reviews`} className="hover:text-canvas">
            {t.reviews}
          </Link>
          <Link href={`${prefix}/funded-trading-programs`} className="hover:text-canvas">
            {t.guide}
          </Link>
          <Link href={`${prefix}/forex-prop-firms`} className="hover:text-canvas">
            {t.forex}
          </Link>
          <Link href={`${prefix}/futures-prop-firms`} className="hover:text-canvas">
            {t.futures}
          </Link>
          <Link href={`${prefix}/crypto-prop-firms`} className="hover:text-canvas">
            {t.crypto}
          </Link>
          <Link href={`${prefix}/prop-firms`} className="hover:text-canvas">
            {t.byCountry}
          </Link>
          {/* /list and /widget are out of translation scope (transactional form / dev-tool
              surface) — always unprefixed, even from a localized page. */}
          <Link href="/list" className="hover:text-canvas">
            {t.listYourFirm}
          </Link>
          <Link href={`${prefix}/rules`} className="hover:text-canvas">
            {t.rules}
          </Link>
          <Link href="/widget" className="hover:text-canvas">
            {t.widget}
          </Link>
        </div>
      </div>
      {switcher && (
        <div className="mx-auto mt-6 max-w-[1280px] border-t border-canvas-soft/10 pt-6">
          <LanguageSwitcher
            path={switcher.path}
            availableLocales={switcher.availableLocales}
            currentLocale={locale}
          />
        </div>
      )}
      <div className="mx-auto mt-8 max-w-[1280px] border-t border-canvas-soft/10 pt-6 text-[14px] text-canvas-soft/50">
        © {new Date().getFullYear()} TraderMarket · tradermarket.online
      </div>
    </footer>
  );
}
