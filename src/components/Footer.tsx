import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-12 text-canvas-soft">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <Logo invert />
          <p className="mt-2 text-[16px] text-canvas-soft/70">
            The public leaderboard where prop firms compete for visibility.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[16px]">
          <Link href="/#leaderboard" className="hover:text-canvas">
            Leaderboard
          </Link>
          <Link href="/best-prop-trading-firms" className="hover:text-canvas">
            Rankings
          </Link>
          <Link href="/prop-firm-reviews" className="hover:text-canvas">
            Reviews
          </Link>
          <Link href="/funded-trading-programs" className="hover:text-canvas">
            Funded Programs Guide
          </Link>
          <Link href="/forex-prop-firms" className="hover:text-canvas">
            Forex
          </Link>
          <Link href="/futures-prop-firms" className="hover:text-canvas">
            Futures
          </Link>
          <Link href="/crypto-prop-firms" className="hover:text-canvas">
            Crypto
          </Link>
          <Link href="/list" className="hover:text-canvas">
            List your firm
          </Link>
          <Link href="/rules" className="hover:text-canvas">
            Rules
          </Link>
          <Link href="/widget" className="hover:text-canvas">
            Widget
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-[1280px] border-t border-canvas-soft/10 pt-6 text-[14px] text-canvas-soft/50">
        © {new Date().getFullYear()} TraderMarket · tradermarket.online
      </div>
    </footer>
  );
}
