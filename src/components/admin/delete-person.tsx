"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash } from "@phosphor-icons/react";
import { adminCopy } from "@/content/admin";

const copy = adminCopy.find;

/** Erasure request: deletes everything held for one address, after a confirm. */
export function DeletePerson({ email }: { email: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");

  async function remove() {
    if (!window.confirm(copy.deleteConfirm(email))) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/admin/remove", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) });
      setStatus(res.ok ? "done" : "failed");
      if (res.ok) router.refresh();
    } catch {
      setStatus("failed");
    }
  }

  if (status === "done") return <p role="status" className="text-[0.9375rem] font-semibold text-fare">{copy.deleted}</p>;
  return (
    <div>
      <button
        type="button"
        onClick={remove}
        disabled={status === "sending"}
        className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[0.9375rem] font-semibold text-dear ring-1 ring-dear/40 hover:bg-dear-tint"
      >
        <Trash className="size-4" aria-hidden />
        {status === "sending" ? copy.deleting : copy.delete}
      </button>
      <p role="alert" className="mt-2 min-h-5 text-[0.875rem] font-medium text-dear">
        {status === "failed" ? copy.deleteFailed : ""}
      </p>
    </div>
  );
}
