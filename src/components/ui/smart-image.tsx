"use client";

import Image, { type ImageLoaderProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { unsplashUrl, type Photo } from "@/content/images";

// Unsplash resizes on its own CDN, so we hand it the width Next asks for
// instead of routing photos through the Next image optimizer.
function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  return unsplashUrl(src, width, quality ?? 72);
}

type Props = {
  photo: Photo;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Fills its (positioned) parent with a photo. The photo's tone colour sits
 * underneath, so the slot keeps its colour while loading and if a photo fails.
 */
export function SmartImage({ photo, sizes, priority, className, imgClassName }: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={clsx("absolute inset-0 overflow-hidden", className)} style={{ backgroundColor: photo.tone }}>
      {!failed && (
        <Image
          loader={unsplashLoader}
          src={photo.id}
          alt={photo.alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          onError={() => setFailed(true)}
          className={clsx("object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
