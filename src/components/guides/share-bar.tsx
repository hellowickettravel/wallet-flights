"use client";

import { useState } from "react";
import { Check, EnvelopeSimple, FacebookLogo, LinkSimple, WhatsappLogo, XLogo } from "@phosphor-icons/react";

/**
 * Plain share links (no third-party scripts or trackers) plus a copy-link
 * button. The links open each service's own share page in a new tab.
 */
export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on WhatsApp (opens in a new tab)", icon: WhatsappLogo, href: `https://wa.me/?text=${t}%20${u}` },
    { label: "Share on X (opens in a new tab)", icon: XLogo, href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { label: "Share on Facebook (opens in a new tab)", icon: FacebookLogo, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "Share by email", icon: EnvelopeSimple, href: `mailto:?subject=${t}&body=${u}` },
  ];
  const item = "grid size-11 place-items-center rounded-full text-ink ring-1 ring-line transition-colors hover:bg-mist";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="mr-1 font-semibold text-ink">Share this guide</p>
      <ul className="flex flex-wrap gap-2">
        {links.map(({ label, icon: Icon, href }) => (
          <li key={label}>
            <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener" className={item}>
              <Icon className="size-5" aria-hidden />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            className={`${item} cursor-pointer`}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
              } catch {
                // Clipboard blocked (permissions or an old browser): nothing to undo.
              }
            }}
          >
            {copied ? <Check className="size-5 text-fare" weight="bold" aria-hidden /> : <LinkSimple className="size-5" aria-hidden />}
            <span className="sr-only">Copy link</span>
          </button>
        </li>
      </ul>
      <p role="status" className="text-[0.875rem] text-fare">
        {copied ? "Link copied" : ""}
      </p>
    </div>
  );
}
