import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RulesContent } from "@/components/content/RulesContent";
import { RULES_COPY } from "@/lib/i18n/copy/rules";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { socialMetadata } from "@/lib/i18n/metadata";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";

const DESCRIPTION =
  "How ranking, bidding, and listings work on TraderMarket — the public prop firm leaderboard.";

export const metadata = {
  title: "Rules",
  description: DESCRIPTION,
  alternates: { canonical: "/rules", languages: languageAlternatesFor("/rules", RULES_COPY) },
  ...socialMetadata({ path: "/rules", title: "Rules — TraderMarket", description: DESCRIPTION }),
};

export default function RulesPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <RulesContent copy={RULES_COPY.en} />
      </main>
      <Footer switcher={{ path: "/rules", availableLocales: SUPPORTED_LOCALES }} />
    </>
  );
}
