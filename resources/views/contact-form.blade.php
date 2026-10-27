<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contact Form</title>
  <style>
    :root{--ink:#0d1b34;--muted:#60718a;--line:#d7e1eb;--cyan:#00aee8;--blue:#07538c;--success:#11966e;--danger:#c7352b}
    *{box-sizing:border-box}html,body{margin:0;padding:0;width:100%;overflow-x:hidden;background:transparent;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--ink)}
    .form-card{width:100%;border:1px solid var(--line);border-radius:28px;background:#fff;box-shadow:0 18px 45px rgba(12,37,66,.08);padding:28px 24px}
    .form-heading{padding-bottom:20px;border-bottom:1px solid var(--line)}
    .eyebrow{display:inline-block;color:var(--cyan);font-size:14px;font-weight:800;letter-spacing:.22em;text-transform:uppercase}
    .status{margin:20px 0 0;padding:14px 16px;border-radius:16px;font-weight:700;line-height:1.45}.success{color:var(--success);border:1px solid #b8e7d5;background:#eaf8f2}.error{color:var(--danger);border:1px solid #fac7c0;background:#fff0ee}
    form{margin-top:24px}.fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 18px}label{display:grid;gap:8px;font-size:15px;font-weight:700;line-height:1.4}.label-text{display:inline-flex;align-items:center;gap:6px}.required{color:#e43f36}.full{grid-column:1/-1}
    .hidden-check{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}
    input,select,textarea{width:100%;min-height:56px;border:1px solid var(--line);border-radius:16px;padding:14px 16px;background:#fff;color:var(--ink);font:inherit;box-shadow:0 2px 5px rgba(8,35,58,.11);outline:none}
    input:focus,select:focus,textarea:focus,button:focus{outline:3px solid rgba(0,174,232,.2);outline-offset:2px}
    textarea{min-height:144px;resize:vertical}input::placeholder,textarea::placeholder{color:#6a7a8e}
    select{appearance:none;background-image:linear-gradient(45deg,transparent 50%,#5d7086 50%),linear-gradient(135deg,#5d7086 50%,transparent 50%);background-position:calc(100% - 21px) 50%,calc(100% - 15px) 50%;background-size:6px 6px,6px 6px;background-repeat:no-repeat}
    button{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:52px;margin-top:22px;padding:0 28px;border:0;border-radius:16px;background:var(--blue);color:#fff;font:inherit;font-weight:800;cursor:pointer;box-shadow:0 14px 32px rgba(7,83,140,.25)}
    button[disabled]{opacity:.75;cursor:progress}
    @media (max-width:720px){.form-card{padding:20px 16px;border-radius:22px}.fields{grid-template-columns:1fr;gap:18px}input,select,textarea{min-height:54px;padding:14px 15px;font-size:15px}textarea{min-height:136px}button{width:100%}}
  </style>
</head>
<body>
  <section class="form-card" aria-labelledby="contact-form-title">
    <div class="form-heading" aria-hidden="true"><span class="eyebrow">Request a Consultation</span></div>
    <h2 id="contact-form-title" class="hidden-check">Contact form</h2>
    <div id="contact-form-status" class="status" hidden aria-live="polite"></div>
    <form id="contact-web3-form" method="post" action="/api/contact" novalidate>
      @csrf
      <input type="hidden" name="source_page" value="/contact-us">
      <label class="hidden-check" for="contact-botcheck">Leave this field blank<input id="contact-botcheck" name="botcheck" type="text" value="" autocomplete="off" tabindex="-1"></label>
      <div class="fields">
        <label for="contact-name"><span class="label-text">Name <span class="required">*</span></span><input id="contact-name" name="name" type="text" required autocomplete="name" placeholder="Your full name"></label>
        <label for="contact-company"><span class="label-text">Organization</span><input id="contact-company" name="company" type="text" autocomplete="organization" placeholder="Company or institution"></label>
        <label for="contact-email"><span class="label-text">Email <span class="required">*</span></span><input id="contact-email" name="email" type="email" required autocomplete="email" placeholder="name@company.com"></label>
        <label for="contact-phone"><span class="label-text">Phone <span class="required">*</span></span><input id="contact-phone" name="phone" type="tel" required autocomplete="tel" inputmode="numeric" minlength="10" maxlength="12" pattern="[0-9]{10,12}" placeholder="9876543210"></label>
        <label for="contact-country"><span class="label-text">Country</span><input id="contact-country" name="country" type="text" autocomplete="country-name" placeholder="Country"></label>
        <label for="contact-industry"><span class="label-text">Industry</span><select id="contact-industry" name="industry"><option value="">Select industry</option><option value="Education">Education</option><option value="Healthcare">Healthcare</option><option value="Finance & Microfinance">Finance & Microfinance</option><option value="NGOs">NGOs</option><option value="Enterprises">Enterprises</option><option value="Audit & Compliance">Audit & Compliance</option><option value="Faith-Based Organizations">Faith-Based Organizations</option><option value="Others">Others</option></select></label>
        <label class="full" for="contact-interest"><span class="label-text">I'm interested in <span class="required">*</span></span><select id="contact-interest" name="product_interest" required><option value="">Select an interest</option><option value="Product Demo">Product Demo</option><option value="AI Transformation">AI Transformation</option><option value="ERP Implementation">ERP Implementation</option><option value="SaaS Modernization">SaaS Modernization</option><option value="Integration">Integration</option><option value="Cloud">Cloud</option><option value="Support">Support</option><option value="Partnership">Partnership</option></select></label>
        <label class="full" for="contact-message"><span class="label-text">Message <span class="required">*</span></span><textarea id="contact-message" name="message" required placeholder="Tell us a bit about your goals, current systems, or timeline."></textarea></label>
      </div>
      <button id="contact-submit" type="submit">Submit <span aria-hidden="true">-></span></button>
    </form>
  </section>
  <script>
    (() => {
      const form = document.getElementById('contact-web3-form');
      const status = document.getElementById('contact-form-status');
      const submitButton = document.getElementById('contact-submit');
      const emailInput = document.getElementById('contact-email');
      const phoneInput = document.getElementById('contact-phone');
      const scriptCache = new Map();
      let securityPayloadPromise = null;

      const setStatus = (message, type) => {
        status.hidden = !message;
        status.className = `status ${type}`;
        status.textContent = message;
      };

      const postHeight = () => {
        const formCard = document.querySelector('.form-card');
        const targetHeight = formCard ? Math.ceil(formCard.getBoundingClientRect().height) : Math.ceil(document.body.scrollHeight);
        window.parent.postMessage({ type: 'bosco-contact-form-height', height: targetHeight }, window.location.origin);
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
          const response = await fetch('/api/form-security/challenge/contact', {
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
        setStatus('Sending...','success');
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
            setStatus('Thanks. Your message has been received.', 'success');
          } else {
            setStatus(data.message || 'We could not send your message right now. Please try again shortly.', 'error');
          }
        } catch (error) {
          setStatus(error instanceof Error ? error.message : 'We could not send your message right now. Please try again shortly.', 'error');
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



