import { lazy, type ComponentType, type LazyExoticComponent } from "react";

const CHUNK_RETRY_PREFIX = "lazy-retry:";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

function isRecoverableChunkError(error: unknown) {
  const message = getErrorMessage(error);

  return /Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk [^ ]+ failed/i.test(
    message,
  );
}

export function lazyWithRetry<T extends ComponentType<unknown>>(
  cacheKey: string,
  importer: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(async () => {
    const retryKey = `${CHUNK_RETRY_PREFIX}${cacheKey}`;

    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(retryKey);
      }

      return await importer();
    } catch (error) {
      if (typeof window !== "undefined" && isRecoverableChunkError(error)) {
        const hasRetried = window.sessionStorage.getItem(retryKey) === "1";

        if (!hasRetried) {
          window.sessionStorage.setItem(retryKey, "1");
          window.location.reload();

          return new Promise<never>(() => {
            // Wait for the reload instead of surfacing a false-positive route error.
          });
        }

        window.sessionStorage.removeItem(retryKey);
      }

      throw error;
    }
  });
}
