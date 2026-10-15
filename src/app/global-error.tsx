"use client";

import { ErrorScreen } from "@/components/layout/error-screen";
import { errorCopy } from "@/content/errors";
import { site } from "@/content/site";
import { Logo } from "@/components/layout/logo";
import "./globals.css";

/** The root layout itself failed: this replaces the whole document, so it brings its own <html>, styles and a minimal header. */
export default function GlobalError(props: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col bg-white">
        <title>{`${errorCopy.title} | ${site.name}`}</title>
        <header className="border-b border-line">
          <div className="container-page flex h-[4.5rem] items-center">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the app shell is broken: reload it */}
            <a href="/" className="rounded-lg">
              <Logo />
              <span className="sr-only"> home</span>
            </a>
          </div>
        </header>
        <main className="flex-1">
          <ErrorScreen {...props} />
        </main>
      </body>
    </html>
  );
}
