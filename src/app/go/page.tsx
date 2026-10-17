import type { Metadata } from "next";
import { Suspense } from "react";
import { Handoff } from "@/components/go/handoff";

export const metadata: Metadata = {
  title: "Taking you to the provider",
  robots: { index: false, follow: false },
};

export default function GoPage() {
  return (
    <div className="min-h-[70dvh] bg-mist px-5 py-12 md:py-20">
      <Suspense fallback={<div className="mx-auto h-96 max-w-lg skeleton rounded-(--radius-frame)" />}>
        <Handoff />
      </Suspense>
    </div>
  );
}
