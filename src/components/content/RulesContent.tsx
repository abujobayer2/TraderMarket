import { BulletList } from "./BulletList";

export interface RulesCopy {
  kicker: string;
  h1: string;
  intro: string;
  sections: { title: string; items: string[] }[];
}

export function RulesContent({ copy }: { copy: RulesCopy }) {
  return (
    <div className="mx-auto max-w-[720px]">
      <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
        {copy.kicker}
      </p>
      <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
        {copy.h1}
      </h1>
      <p className="mt-4 text-[18px] leading-[27px] text-body">{copy.intro}</p>

      <div className="mt-12 flex flex-col gap-10">
        {copy.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              {section.title}
            </h2>
            <BulletList items={section.items} />
          </section>
        ))}
      </div>
    </div>
  );
}
