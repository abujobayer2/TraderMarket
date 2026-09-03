import Link from "next/link";
import { BulletList } from "./BulletList";
import type { LeaderboardEntry } from "@/lib/ranking";

export interface FundedTradingProgramsCopy {
  kicker: string;
  h1: string;
  intro: string;
  whatIsHeading: string;
  whatIsBody: string;
  payAfterPassHeading: string;
  payAfterPassBody1: string;
  payAfterPassBody2: string;
  checklistHeading: string;
  checklistItems: string[];
  checklistPrefix: string;
  checklistLinkText: string;
  checklistSuffix: string;
  firmsHeading: string;
  firmsIntro: string;
  fullRankingLinkText: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaText: string;
  ctaButton: string;
}

export function FundedTradingProgramsContent({
  copy,
  prefix,
  firms,
}: {
  copy: FundedTradingProgramsCopy;
  prefix: string;
  firms: LeaderboardEntry[];
}) {
  return (
    <div className="mx-auto max-w-[820px]">
      <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
        {copy.kicker}
      </p>
      <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
        {copy.h1}
      </h1>
      <p className="mt-4 text-[18px] leading-[27px] text-body">{copy.intro}</p>

      <section className="mt-14">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.whatIsHeading}
        </h2>
        <p className="mt-3 text-[16px] leading-[24px] text-body">{copy.whatIsBody}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.payAfterPassHeading}
        </h2>
        <p className="mt-3 text-[16px] leading-[24px] text-body">{copy.payAfterPassBody1}</p>
        <p className="mt-3 text-[16px] leading-[24px] text-body">{copy.payAfterPassBody2}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.checklistHeading}
        </h2>
        <BulletList items={copy.checklistItems} />
        <p className="mt-4 text-[16px] leading-[24px] text-body">
          {copy.checklistPrefix}{" "}
          <Link href={`${prefix}/best-prop-trading-firms`} className="font-semibold text-ink hover:text-primary">
            {copy.checklistLinkText}
          </Link>{" "}
          {copy.checklistSuffix}
        </p>
      </section>

      {firms.length > 0 && (
        <section className="mt-12">
          <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
            {copy.firmsHeading}
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-body">{copy.firmsIntro}</p>
          <ul className="mt-4 flex flex-col gap-2">
            {firms.map((firm) => (
              <li key={firm.id}>
                <Link
                  href={`/firm/${firm.slug}`}
                  className="text-[16px] font-semibold leading-[24px] text-ink hover:text-primary"
                >
                  #{firm.rank} {firm.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`${prefix}/best-prop-trading-firms`}
            className="mt-4 inline-block text-[14px] font-semibold text-body-mid hover:text-primary"
          >
            {copy.fullRankingLinkText}
          </Link>
        </section>
      )}

      <section className="mt-16 border-t border-ink/10 pt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.faqHeading}
        </h2>
        <div className="mt-6 flex flex-col gap-6">
          {copy.faqs.map((item) => (
            <div key={item.q}>
              <p className="text-[16px] font-semibold leading-[24px] text-ink">{item.q}</p>
              <p className="mt-1 text-[16px] leading-[24px] text-body">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-md bg-ink p-8 text-center">
        <p className="text-[20px] font-medium leading-[27px] text-canvas">{copy.ctaText}</p>
        <Link
          href="/list"
          className="mt-5 inline-block rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary hover:bg-primary-hover"
        >
          {copy.ctaButton}
        </Link>
      </section>
    </div>
  );
}
