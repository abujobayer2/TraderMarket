import Link from "next/link";
import { Logo } from "./Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur border-b border-ink/10">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3">
        <Link href="/" aria-label="TraderMarket home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          <Link href="/#leaderboard" className="text-[16px] text-ink hover:text-body">
            Leaderboard
          </Link>
          <Link href="/#how-it-works" className="text-[16px] text-ink hover:text-body">
            How it works
          </Link>
          <Link href="/rules" className="text-[16px] text-ink hover:text-body">
            Rules
          </Link>
        </nav>
        <Link
          href="/list"
          className="rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary transition-colors hover:bg-primary-hover"
        >
          List your firm
        </Link>
      </div>
    </header>
  );
}
