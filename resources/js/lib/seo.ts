const DEFAULT_SITE_URL = "https://www.boscosofttech.com";

export function getSiteUrl() {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }

  return (import.meta.env.VITE_SITE_URL as string | undefined)?.trim() || DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}
