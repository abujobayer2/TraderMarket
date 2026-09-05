import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { socialMetadata } from "@/lib/i18n/metadata";
import { ListWizard } from "./ListWizard";

const DESCRIPTION =
  "Submit your prop firm to TraderMarket, choose a leaderboard position, and pay once with crypto to claim your rank.";

export const metadata = {
  title: "List Your Prop Firm",
  description: DESCRIPTION,
  alternates: { canonical: "/list" },
  ...socialMetadata({ path: "/list", title: "List Your Prop Firm — TraderMarket", description: DESCRIPTION }),
};

export default function ListPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-canvas-soft px-6 py-16">
        <div className="mx-auto max-w-[720px]">
          <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
            List your prop firm
          </p>
          <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
            Claim your position
          </h1>
          <p className="mt-4 text-[18px] leading-[27px] text-body">
            Tell traders about your firm, pick a position, and pay once with crypto.
          </p>

          <Suspense>
            <ListWizard />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
