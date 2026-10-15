"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { CheckCircle, Info, PaperPlaneTilt } from "@phosphor-icons/react";
import clsx from "clsx";
import { bookingNote, contactLimits, contactTopics } from "@/content/contact";
import { site } from "@/content/site";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/validate-contact";

type Status = "idle" | "sending" | "sent" | "failed";

const empty: ContactInput = { name: "", email: "", topic: "", message: "" };

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");

  function set<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first field with a problem.
      const first = (["name", "email", "topic", "message"] as const).find((k) => found[k]);
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const company = (formRef.current?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });
      if (!res.ok) throw new Error();
      setSentName(values.name.trim().split(/\s+/)[0]);
      setValues(empty);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  const field = (key: keyof ContactInput) => ({
    "aria-invalid": !!errors[key] || undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-err` : undefined,
    "data-field": key,
  });

  const inputClass = (key: keyof ContactInput) =>
    clsx(
      "w-full rounded-xl bg-white px-4 text-[1.0625rem] text-ink outline-none ring-1 transition-shadow placeholder:text-ink-soft focus-visible:ring-2 focus-visible:ring-action",
      errors[key] ? "ring-2 ring-red-600" : "ring-line hover:ring-ink/30",
    );

  return (
    <div className="rounded-(--radius-panel) bg-white p-5 shadow-(--shadow-float) ring-1 ring-line/70 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <m.div
            key="sent"
            role="status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="py-6 text-center sm:py-10"
          >
            <CheckCircle weight="fill" className="mx-auto size-14 text-fare" aria-hidden />
            <h2 className="mt-4 font-display-tight text-[1.75rem] font-bold text-ink">Message sent{sentName ? `, ${sentName}` : ""}</h2>
            <p className="mx-auto mt-2 max-w-sm leading-relaxed text-ink-soft">
              Thanks for getting in touch. {site.responseTime}, usually sooner.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 h-11 cursor-pointer rounded-full px-5 font-semibold text-action ring-1 ring-line hover:bg-mist"
            >
              Send another message
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            onSubmit={submit}
            noValidate
            aria-label="Contact form"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            className="grid gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className="mb-1.5 block text-[0.9375rem] font-medium text-ink">
                  Your name
                </label>
                <input
                  id={`${id}-name`}
                  autoComplete="name"
                  maxLength={contactLimits.name}
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={clsx(inputClass("name"), "h-13")}
                  {...field("name")}
                />
                <FieldError id={`${id}-name-err`} message={errors.name} />
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="mb-1.5 block text-[0.9375rem] font-medium text-ink">
                  Email address
                </label>
                <input
                  id={`${id}-email`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={clsx(inputClass("email"), "h-13")}
                  {...field("email")}
                />
                <FieldError id={`${id}-email-err`} message={errors.email} />
              </div>
            </div>

            <fieldset aria-describedby={errors.topic ? `${id}-topic-err` : undefined}>
              <legend className="mb-2 text-[0.9375rem] font-medium text-ink">What is your message about?</legend>
              <div className="flex flex-wrap gap-2">
                {contactTopics.map((t, i) => {
                  const checked = values.topic === t.id;
                  return (
                    <label
                      key={t.id}
                      className={clsx(
                        "inline-flex h-11 cursor-pointer items-center rounded-full px-4 text-[0.9375rem] font-medium ring-1 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-action",
                        checked ? "bg-ink text-white ring-ink" : "text-ink hover:bg-mist",
                        !checked && (errors.topic ? "ring-red-600" : "ring-line"),
                      )}
                    >
                      <input
                        type="radio"
                        name={`${id}-topic`}
                        value={t.id}
                        checked={checked}
                        onChange={() => set("topic", t.id)}
                        className="sr-only"
                        {...(i === 0 ? field("topic") : {})}
                      />
                      {t.label}
                    </label>
                  );
                })}
              </div>
              <FieldError id={`${id}-topic-err`} message={errors.topic} />
              <AnimatePresence initial={false}>
                {values.topic === "booking" && (
                  <m.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <span className="mt-3 flex gap-3 rounded-xl bg-mist p-4 text-[0.9375rem] leading-relaxed text-ink">
                      <Info className="mt-0.5 size-5 shrink-0 text-action" aria-hidden />
                      {bookingNote}
                    </span>
                  </m.p>
                )}
              </AnimatePresence>
            </fieldset>

            <div>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <label htmlFor={`${id}-message`} className="text-[0.9375rem] font-medium text-ink">
                  Message
                </label>
                <span
                  className={clsx(
                    "tabular text-[0.8125rem]",
                    values.message.length > contactLimits.message ? "text-red-700" : "text-ink-soft",
                  )}
                >
                  {values.message.length}/{contactLimits.message}
                </span>
              </div>
              <textarea
                id={`${id}-message`}
                rows={6}
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Include your route and dates if your question is about a flight."
                className={clsx(inputClass("message"), "resize-y py-3 leading-relaxed")}
                {...field("message")}
              />
              <FieldError id={`${id}-message-err`} message={errors.message} />
            </div>

            {/* Honeypot for bots: hidden from people and assistive tech. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.875rem] text-ink-soft">{site.responseTime}.</p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-action px-8 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-action-deep disabled:opacity-70 sm:w-auto"
              >
                <PaperPlaneTilt weight="fill" className="size-5" aria-hidden />
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </div>
            {status === "failed" && (
              <p role="alert" className="rounded-xl bg-red-50 p-4 text-[0.9375rem] font-medium text-red-800">
                Your message didn’t send. Please try again in a moment, or email us at{" "}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>
                .
              </p>
            )}
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.875rem] font-medium text-red-700">
      {message}
    </p>
  );
}
