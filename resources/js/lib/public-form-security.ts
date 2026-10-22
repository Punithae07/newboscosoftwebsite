import { apiRequest } from "@/lib/api";

export type PublicFormName = "contact" | "newsletter" | "brochure";

type ChallengePayload = {
  challenge: {
    issued_at: number;
    nonce: string;
    signature: string;
  };
  captcha: {
    provider: "turnstile" | "recaptcha_v3" | "none";
    site_key: string;
    action: string;
  };
  minimum_submit_seconds: number;
};

type ChallengeCacheEntry = {
  fetchedAt: number;
  payload: ChallengePayload;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: Record<string, unknown>,
      ) => string | number;
      execute: (widgetId: string | number) => void;
      remove?: (widgetId: string | number) => void;
      reset?: (widgetId: string | number) => void;
    };
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
    __boscoFormScripts?: Record<string, Promise<void>>;
  }
}

const challengeCache = new Map<PublicFormName, Promise<ChallengeCacheEntry>>();

function getGlobalScriptCache() {
  window.__boscoFormScripts ??= {};
  return window.__boscoFormScripts;
}

async function requestChallenge(form: PublicFormName): Promise<ChallengeCacheEntry> {
  const payload = await apiRequest<ChallengePayload>(`/form-security/challenge/${form}`, {
    method: "GET",
  });

  return {
    fetchedAt: Date.now(),
    payload,
  };
}

function getCachedChallenge(form: PublicFormName, forceRefresh = false) {
  const cached = challengeCache.get(form);

  if (!forceRefresh && cached) {
    return cached;
  }

  const nextRequest = requestChallenge(form).catch((error) => {
    challengeCache.delete(form);
    throw error;
  });

  challengeCache.set(form, nextRequest);

  return nextRequest;
}

function loadScript(src: string) {
  const cache = getGlobalScriptCache();

  if (!cache[src]) {
    cache[src] = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);

      if (existing) {
        if (existing.dataset.loaded === "true") {
          resolve();
          return;
        }

        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("Could not load form security script.")), {
          once: true,
        });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", () => {
        script.dataset.loaded = "true";
        resolve();
      }, { once: true });
      script.addEventListener("error", () => reject(new Error("Could not load form security script.")), {
        once: true,
      });
      document.head.appendChild(script);
    });
  }

  return cache[src];
}

async function getTurnstileToken(siteKey: string, action: string) {
  await loadScript("https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit");

  if (!window.turnstile) {
    throw new Error("Form security could not be initialized.");
  }

  return new Promise<string>((resolve, reject) => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    document.body.appendChild(container);

    const cleanup = (widgetId?: string | number) => {
      if (widgetId !== undefined) {
        window.turnstile?.remove?.(widgetId);
      }
      container.remove();
    };

    const widgetId = window.turnstile.render(container, {
      sitekey: siteKey,
      action,
      size: "invisible",
      execution: "execute",
      callback: (token: string) => {
        cleanup(widgetId);
        resolve(token);
      },
      "error-callback": () => {
        cleanup(widgetId);
        reject(new Error("Captcha verification could not be completed."));
      },
      "expired-callback": () => {
        cleanup(widgetId);
        reject(new Error("Captcha verification expired. Please try again."));
      },
    });

    window.turnstile.execute(widgetId);
  });
}

async function getRecaptchaToken(siteKey: string, action: string) {
  await loadScript(`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`);

  if (!window.grecaptcha) {
    throw new Error("Form security could not be initialized.");
  }

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.ready(() => {
      window.grecaptcha
        ?.execute(siteKey, { action })
        .then(resolve)
        .catch(() => reject(new Error("Captcha verification could not be completed.")));
    });
  });
}

async function getCaptchaToken(config: ChallengePayload["captcha"]) {
  if (config.provider === "turnstile") {
    return getTurnstileToken(config.site_key, config.action);
  }

  if (config.provider === "recaptcha_v3") {
    return getRecaptchaToken(config.site_key, config.action);
  }

  return "local-dev-bypass-token";
}

export async function buildSecureFormPayload<T extends Record<string, unknown>>(
  form: PublicFormName,
  payload: T,
) {
  const response = (await getCachedChallenge(form)).payload;
  const captchaToken = await getCaptchaToken(response.captcha);

  void getCachedChallenge(form, true);

  return {
    ...payload,
    form_issued_at: response.challenge.issued_at,
    form_nonce: response.challenge.nonce,
    form_signature: response.challenge.signature,
    captcha_token: captchaToken,
  };
}

export async function warmSecureFormChallenge(form: PublicFormName) {
  await getCachedChallenge(form);
}
