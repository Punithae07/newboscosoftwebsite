const API_BASE_URL = (import.meta.env.VITE_LARAVEL_API_URL as string | undefined)?.trim() || "/api";

type RequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  headers?: HeadersInit;
};

function getCsrfToken() {
  if (typeof document === "undefined") {
    return null;
  }

  return document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content")
    ?.trim() || null;
}

async function readErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message || "Request failed.";
  } catch {
    return "Request failed.";
  }
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  headers.set("X-Requested-With", "XMLHttpRequest");

  const csrfToken = getCsrfToken();
  if (csrfToken && options.method && options.method.toUpperCase() !== "GET") {
    headers.set("X-CSRF-TOKEN", csrfToken);
  }

  let body: BodyInit | undefined;
  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "same-origin",
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
