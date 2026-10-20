"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LockKey } from "@phosphor-icons/react";
import { buttonClass } from "@/components/ui/button";
import { adminCopy } from "@/content/admin";

const copy = adminCopy.signIn;
type Status = "idle" | "sending" | "invalid" | "tooMany" | "failed";

export function SignInForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: form.get("username"), password: form.get("password") }),
      });
      if (res.ok) {
        // The page reads the new cookie and shows the dashboard.
        router.refresh();
        return;
      }
      setStatus(res.status === 401 ? "invalid" : res.status === 429 ? "tooMany" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  const field = "mt-2 block h-12 w-full rounded-xl bg-white px-4 text-ink ring-1 ring-line outline-none focus-visible:ring-2 focus-visible:ring-action";
  const error = status === "invalid" || status === "tooMany" || status === "failed" ? copy[status] : "";

  return (
    <div className="mx-auto max-w-md rounded-(--radius-panel) bg-white p-8 shadow-(--shadow-float) ring-1 ring-line sm:p-10">
      <span className="grid size-12 place-items-center rounded-full bg-mist text-action">
        <LockKey className="size-6" weight="fill" aria-hidden />
      </span>
      <h1 className="mt-5 font-display-tight text-[1.75rem] leading-tight font-extrabold text-ink">{copy.title}</h1>
      <p className="mt-2 text-ink-soft">{copy.text}</p>
      {configured ? (
        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block text-[0.9375rem] font-semibold text-ink">
            {copy.username}
            <input name="username" autoComplete="username" required maxLength={200} className={field} />
          </label>
          <label className="block text-[0.9375rem] font-semibold text-ink">
            {copy.password}
            <input name="password" type="password" autoComplete="current-password" required maxLength={500} className={field} />
          </label>
          <button type="submit" disabled={status === "sending"} className={buttonClass("primary", "lg", "w-full")}>
            {status === "sending" ? copy.sending : copy.button}
          </button>
          <p role="alert" className="min-h-5 text-[0.875rem] font-medium text-dear">
            {error}
          </p>
        </form>
      ) : (
        <p className="mt-8 rounded-xl bg-mist p-4 text-[0.9375rem] text-ink">{copy.notConfigured}</p>
      )}
    </div>
  );
}
