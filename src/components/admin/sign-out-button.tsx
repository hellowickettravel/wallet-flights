"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignOut } from "@phosphor-icons/react";
import { adminCopy } from "@/content/admin";

export function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function signOut() {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" }).catch(() => null);
    router.replace("/admin");
    router.refresh();
  }
  return (
    <button
      type="button"
      onClick={signOut}
      disabled={busy}
      className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-[0.9375rem] font-semibold text-white ring-1 ring-white/25 hover:bg-white/10"
    >
      <SignOut className="size-4" aria-hidden />
      {adminCopy.signOut}
    </button>
  );
}
