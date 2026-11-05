import type { Photo } from "../images";

/** One Unsplash photo: id (the "photo-…" part of its images.unsplash.com URL), alt text, dominant colour, photographer name and username. */
export const photo = (id: string, alt: string, tone: string, by: string, user: string): Photo => ({ id, alt, tone, by, user });
