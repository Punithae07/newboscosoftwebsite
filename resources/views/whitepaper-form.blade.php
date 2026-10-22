<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>White Paper Form</title>
  <style>
    :root{--ink:#0d1b34;--muted:#60718a;--line:#d7e1eb;--cyan:#00aee8;--blue:#07538c;--success:#11966e;--danger:#c7352b}
    *{box-sizing:border-box}html,body{margin:0;padding:0;width:100%;overflow-x:hidden;background:transparent;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--ink)}
    .form-card{width:100%;border:1px solid var(--line);border-radius:28px;background:#fff;box-shadow:0 18px 45px rgba(12,37,66,.08);padding:28px 24px}
    .eyebrow{margin:0 0 12px;color:var(--cyan);font-size:13px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}
    h2{margin:0;font-size:clamp(2rem,4vw,2.5rem);line-height:1.08}.lead{margin:16px 0 0;color:var(--muted);font-size:16px;line-height:1.7}.form-head{padding-bottom:20px;border-bottom:1px solid var(--line)}
    .status{margin:20px 0 0;padding:14px 16px;border-radius:16px;font-weight:700;line-height:1.45}.success{color:var(--success);border:1px solid #b8e7d5;background:#eaf8f2}.error{color:var(--danger);border:1px solid #fac7c0;background:#fff0ee}
    form{margin-top:22px}.fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 18px}label{display:grid;gap:8px;font-size:15px;font-weight:700;line-height:1.4}.label-text{display:inline-flex;align-items:center;gap:6px}.required{color:#e43f36}
    .hidden-check{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}
    .selected-paper{margin-top:18px;padding:14px 16px;border-radius:18px;border:1px solid var(--line);background:#f8fbff;color:var(--muted);font-size:15px;line-height:1.6}
    .selected-paper strong{color:var(--ink)}
    input{width:100%;min-height:56px;border:1px solid var(--line);border-radius:16px;padding:14px 16px;background:#fff;color:var(--ink);font:inherit;box-shadow:0 2px 5px rgba(8,35,58,.11);outline:none}
    input:focus,button:focus{outline:3px solid rgba(0,174,232,.2);outline-offset:2px}
    input::placeholder{color:#6a7a8e}
    button{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:52px;margin-top:22px;padding:0 28px;border:0;border-radius:16px;background:var(--blue);color:#fff;font:inherit;font-weight:800;cursor:pointer;box-shadow:0 14px 32px rgba(7,83,140,.25)}
    button[disabled]{opacity:.75;cursor:progress}
    @media (max-width:560px){.form-card{padding:20px 16px;border-radius:22px}.fields{grid-template-columns:1fr;gap:18px}input{min-height:54px;padding:14px 15px;font-size:15px}button{width:100%}}
  </style>
</head>
<body>
  @php
    $paperTitle = trim((string) request()->query('title', 'White Paper'));
    $paperSlug = trim((string) request()->query('slug', 'whitepaper'));
    $paperPdf = trim((string) request()->query('pdf', ''));
  @endphp
  <section class="form-card" aria-labelledby="whitepaper-form-title">
    <div class="form-head">
      <h2 id="whitepaper-form-title">Request your download</h2>
      <p class="lead">Complete this short form and your white paper download will start immediately.</p>
      <div class="selected-paper">Selected paper: <strong>{{ $paperTitle }}</strong></div>
    </div>
    <div id="whitepaper-form-status" class="status" hidden aria-live="polite"></div>
    <form id="whitepaper-form" method="post" action="/api/brochure-request" novalidate>
      @csrf
      <input type="hidden" name="source_page" value="/whitepapers:{{ $paperSlug }}">
      <input type="hidden" name="country" value="">
      <input type="hidden" name="industry" value="">
      <input type="hidden" name="product_interest" value="White Paper - {{ $paperTitle }}">
      <input type="hidden" name="message" value='Please send me the white paper "{{ $paperTitle }}".'>
      <label class="hidden-check" for="whitepaper-botcheck">Leave this field blank<input id="whitepaper-botcheck" name="botcheck" type="text" value="" autocomplete="off" tabindex="-1"></label>
      <div class="fields">
        <label for="whitepaper-name"><span class="label-text">Name <span class="required">*</span></span><input id="whitepaper-name" name="name" type="text" required autocomplete="name" placeholder="Your full name"></label>
        <label for="whitepaper-company"><span class="label-text">Organization <span class="required">*</span></span><input id="whitepaper-company" name="company" type="text" required autocomplete="organization" placeholder="Company or institution"></label>
        <label for="whitepaper-email"><span class="label-text">Email <span class="required">*</span></span><input id="whitepaper-email" name="email" type="email" required autocomplete="email" placeholder="name@company.com"></label>
        <label for="whitepaper-phone"><span class="label-text">Phone <span class="required">*</span></span><input id="whitepaper-phone" name="phone" type="tel" required autocomplete="tel" inputmode="numeric" minlength="10" maxlength="12" pattern="[0-9]{10,12}" placeholder="9876543210"></label>
      </div>
      <button id="whitepaper-submit" type="submit">Download White Paper</button>
    </form>
  </section>
  <script>
    (() => {
      const form = document.getElementById('whitepaper-form');
      const status = document.getElementById('whitepaper-form-status');
      const submitButton = document.getElementById('whitepaper-submit');
      const emailInput = document.getElementById('whitepaper-email');
      const phoneInput = document.getElementById('whitepaper-phone');
      const downloadPath = @json($paperPdf);
      const scriptCache = new Map();
      let securityPayloadPromise = null;

      const setStatus = (message, type) => {
        status.hidden = !message;
        status.className = `status ${type}`;
        status.textContent = message;
      };

      const clearStatus = () => {
        status.hidden = true;
        status.className = 'status';
        status.textContent = '';
      };

      const postHeight = () => {
        const formCard = document.querySelector('.form-card');
        const targetHeight = formCard ? Math.ceil(formCard.getBoundingClientRect().height) : Math.ceil(document.body.scrollHeight);
        window.parent.postMessage({ type: 'bosco-whitepaper-form-height', height: targetHeight }, window.location.origin);
      };

      const validEmail = (value) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);

      const loadScript = (src) => {
        if (!scriptCache.has(src)) {
          scriptCache.set(src, new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) {
              if (existing.dataset.loaded === 'true') {
                resolve();
                return;
              }
              existing.addEventListener('load', () => resolve(), { once: true });
              existing.addEventListener('error', () => reject(new Error('Could not load form security script.')), { once: true });
              return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.defer = true;
            script.addEventListener('load', () => {
              script.dataset.loaded = 'true';
              resolve();
            }, { once: true });
            script.addEventListener('error', () => reject(new Error('Could not load form security script.')), { once: true });
            document.head.appendChild(script);
          }));
        }

        return scriptCache.get(src);
      };

      const getTurnstileToken = async (siteKey, action) => {
        await loadScript('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit');

        if (!window.turnstile) {
          throw new Error('Form security could not be initialized.');
        }

        return new Promise((resolve, reject) => {
          const container = document.createElement('div');
          container.style.position = 'fixed';
          container.style.left = '-9999px';
          container.style.top = '0';
          document.body.appendChild(container);

          const cleanup = (widgetId) => {
            if (widgetId !== undefined && typeof window.turnstile.remove === 'function') {
              window.turnstile.remove(widgetId);
            }
            container.remove();
          };

          const widgetId = window.turnstile.render(container, {
            sitekey: siteKey,
            action,
            size: 'invisible',
            execution: 'execute',
            callback: (token) => {
              cleanup(widgetId);
              resolve(token);
            },
            'error-callback': () => {
              cleanup(widgetId);
              reject(new Error('Captcha verification could not be completed.'));
            },
            'expired-callback': () => {
              cleanup(widgetId);
              reject(new Error('Captcha verification expired. Please try again.'));
            },
          });

          window.turnstile.execute(widgetId);
        });
      };

      const getRecaptchaToken = async (siteKey, action) => {
        await loadScript(`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`);

        if (!window.grecaptcha) {
          throw new Error('Form security could not be initialized.');
        }

        return new Promise((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute(siteKey, { action }).then(resolve).catch(() => {
              reject(new Error('Captcha verification could not be completed.'));
            });
          });
        });
      };

      const requestSecurityPayload = async (forceRefresh = false) => {
        if (!forceRefresh && securityPayloadPromise) {
          return securityPayloadPromise;
        }

        securityPayloadPromise = (async () => {
          const response = await fetch('/api/form-security/challenge/brochure', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
          });

          if (!response.ok) {
            throw new Error('Form security could not be initialized. Please refresh and try again.');
          }

          const payload = await response.json();
          const captcha = payload.captcha || {};
          let captchaToken = 'local-dev-bypass-token';

          if (captcha.provider === 'turnstile') {
            captchaToken = await getTurnstileToken(captcha.site_key, captcha.action);
          } else if (captcha.provider === 'recaptcha_v3') {
            captchaToken = await getRecaptchaToken(captcha.site_key, captcha.action);
          } else if (captcha.provider !== 'none') {
            throw new Error('Form security is not configured. Please try again later.');
          }

          return {
            form_issued_at: payload.challenge.issued_at,
            form_nonce: payload.challenge.nonce,
            form_signature: payload.challenge.signature,
            captcha_token: captchaToken,
          };
        })().catch((error) => {
          securityPayloadPromise = null;
          throw error;
        });

        return securityPayloadPromise;
      };

      phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 12);
        if (phoneInput.value.length && (phoneInput.value.length < 10 || phoneInput.value.length > 12)) {
          phoneInput.setCustomValidity('Phone number must be 10 to 12 digits.');
        } else {
          phoneInput.setCustomValidity('');
        }
      });

      emailInput.addEventListener('input', () => {
        const value = emailInput.value.trim();
        if (value && !validEmail(value)) {
          emailInput.setCustomValidity('Enter a valid email address.');
        } else {
          emailInput.setCustomValidity('');
        }
      });

      window.addEventListener('load', postHeight);
      void requestSecurityPayload().catch(() => {
        securityPayloadPromise = null;
      });
      window.addEventListener('resize', postHeight);
      const observer = new ResizeObserver(() => postHeight());
      observer.observe(document.body);
      const formCard = document.querySelector('.form-card');
      if (formCard) observer.observe(formCard);

      form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const emailValue = emailInput.value.trim();
        const phoneValue = phoneInput.value.trim();

        if (!validEmail(emailValue)) {
          emailInput.setCustomValidity('Enter a valid email address.');
          emailInput.reportValidity();
          return;
        }

        if (!/^\d{10,12}$/.test(phoneValue)) {
          phoneInput.setCustomValidity('Phone number must be 10 to 12 digits.');
          phoneInput.reportValidity();
          return;
        }

        emailInput.setCustomValidity('');
        phoneInput.setCustomValidity('');
        submitButton.disabled = true;
        setStatus('Sending...', 'success');
        postHeight();

        try {
          const securityPayload = await requestSecurityPayload();
          const formData = new FormData(form);
          Object.entries(securityPayload).forEach(([key, value]) => formData.set(key, value));

          const response = await fetch(form.action, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
            body: formData,
          });

          const data = await response.json();

          if (response.ok && data.success) {
            form.reset();
            setStatus('Thanks. Your download is starting.', 'success');
            window.parent.postMessage({
              type: 'bosco-whitepaper-download',
              downloadPath,
            }, window.location.origin);
            return;
          }

          clearStatus();
        } catch {
          clearStatus();
        } finally {
          submitButton.disabled = false;
          void requestSecurityPayload(true).catch(() => {
            securityPayloadPromise = null;
          });
          postHeight();
        }
      });

      postHeight();
    })();
  </script>
</body>
</html>
