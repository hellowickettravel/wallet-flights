import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { AdminBar, DashboardView } from "@/components/admin/dashboard";
import { SignInForm } from "@/components/admin/sign-in-form";
import { adminCopy } from "@/content/admin";
import { adminConfigured, currentAdmin } from "@/lib/admin-auth";
import { loadDashboard } from "@/lib/admin-data";

export const metadata: Metadata = {
  title: adminCopy.metaTitle,
  robots: { index: false, follow: false },
};

/**
 * The owner's dashboard: subscribers, price alerts, the daily check, a
 * person's history and CSV exports. Signed-in only (src/lib/admin-auth.ts);
 * everything is read fresh on each visit, never cached.
 */
type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default function AdminPage({ searchParams }: Props) {
  return (
    <div className="min-h-dvh bg-mist">
      <Suspense fallback={<AdminBar />}>
        <Gate searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Gate({ searchParams }: Props) {
  await connection();
  const admin = await currentAdmin();
  if (!admin) {
    return (
      <>
        <AdminBar />
        <div className="px-5 py-12 md:py-20">
          <SignInForm configured={adminConfigured()} />
        </div>
      </>
    );
  }
  const q = (await searchParams).q;
  const query = typeof q === "string" ? q.slice(0, 254) : "";
  const data = await loadDashboard().catch((e) => {
    console.error(e);
    return "error" as const;
  });
  if (!data || data === "error") {
    return (
      <>
        <AdminBar admin={admin} />
        <div className="container-page py-12">
          <h1 className="font-display-tight text-[2rem] font-extrabold text-ink">{adminCopy.title}</h1>
          <p className="mt-4 max-w-2xl rounded-xl bg-white p-5 text-ink ring-1 ring-line">{data === "error" ? adminCopy.databaseError : adminCopy.noDatabase}</p>
        </div>
      </>
    );
  }
  return <DashboardView admin={admin} data={data} query={query} />;
}
