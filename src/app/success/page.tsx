import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SuccessStatus } from "./SuccessStatus";

export const metadata = {
  title: "Payment Status",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-canvas-soft px-6 py-16">
        <div className="mx-auto max-w-[560px] text-center">
          <Suspense>
            <SuccessStatus />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
