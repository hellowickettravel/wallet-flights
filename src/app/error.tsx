"use client";

import { ErrorScreen } from "@/components/layout/error-screen";

/** A page failed to render: the header and footer stay, this replaces the page. */
export default function ErrorPage(props: { error: Error & { digest?: string }; retry: () => void }) {
  return <ErrorScreen {...props} />;
}
