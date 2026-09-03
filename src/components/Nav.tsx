import Link from "next/link";
import { Logo } from "./Logo";
import type { Locale } from "@/lib/i18n/locales";

export type NavCopy = {
  leaderboard: string;
  reviews: string;
  howItWorks: string;
  guide: string;
  rules: string;
  listYourFirm: string;
};

const EN_NAV_COPY: NavCopy = {
  leaderboard: "Leaderboard",
  reviews: "Reviews",
  howItWorks: "How it works",
  guide: "Guide",
  rules: "Rules",
  listYourFirm: "List your firm",
};

// `locale`/`copy` are only passed by the translated (/[lang]/...) pages —
// every existing English page keeps calling <Nav /> with no props and gets
// identical output to before this became locale-aware.
export function Nav({ locale, copy }: { locale?: Locale; copy?: NavCopy } = {}) {
  const prefix = locale ? `/${locale}` : "";
  const t = copy ?? EN_NAV_COPY;

  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur border-b border-ink/10">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3">
        <Link href={prefix || "/"} aria-label="TraderMarket home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          <Link href={`${prefix}/#leaderboard`} className="text-[16px] text-ink hover:text-body">
            {t.leaderboard}
          </Link>
          <Link href={`${prefix}/prop-firm-reviews`} className="text-[16px] text-ink hover:text-body">
            {t.reviews}
          </Link>
          <Link href={`${prefix}/#how-it-works`} className="text-[16px] text-ink hover:text-body">
            {t.howItWorks}
          </Link>
          <Link href={`${prefix}/funded-trading-programs`} className="text-[16px] text-ink hover:text-body">
            {t.guide}
          </Link>
          <Link href={`${prefix}/rules`} className="text-[16px] text-ink hover:text-body">
            {t.rules}
          </Link>
        </nav>
        {/* /list is a transactional form, kept English-only — always unprefixed. */}
        <Link
          href="/list"
          className="rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary transition-colors hover:bg-primary-hover"
        >
          {t.listYourFirm}
        </Link>
      </div>
    </header>
  );
}
