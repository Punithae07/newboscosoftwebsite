<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="index,follow">
    <title>Bosco Soft Technologies | Digital Transformation Partner</title>
    <meta name="description" content="Bosco Soft Technologies helps enterprises and institutions modernize operations through AI-enabled SaaS platforms, ERP/CRM implementation, integrations, analytics, cloud infrastructure, and digital transformation services.">
    <link                                                                                                                                                                                                                        href="{{ url()->current() }}">
    <meta property="og:site_name" content="Bosco Soft Technologies">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Bosco Soft Technologies | Digital Transformation Partner">
    <meta property="og:description" content="Bosco Soft Technologies helps enterprises and institutions modernize operations through AI-enabled SaaS platforms, ERP/CRM implementation, integrations, analytics, cloud infrastructure, and digital transformation services.">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ url('/images/herosection01.webp') }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Bosco Soft Technologies | Digital Transformation Partner">
    <meta name="twitter:description" content="Bosco Soft Technologies helps enterprises and institutions modernize operations through AI-enabled SaaS platforms, ERP/CRM implementation, integrations, analytics, cloud infrastructure, and digital transformation services.">
    <meta name="twitter:image" content="{{ url('/images/herosection01.webp') }}">
    <meta name="theme-color" content="#071236">
    <link rel="icon" href="/images/fav-icon.png" type="image/png">
    <style>
      html,
      body {
        margin: 0;
        min-height: 100%;
        background: #071236;
      }

      body {
        background-image: none;
        color: #ffffff;
        font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      }

      #root {
        min-height: 100vh;
        background: transparent;
      }

      /* Leader Card Customizations */
      .leader-card {
        border-radius: 14px !important;
        overflow: hidden !important;
        border: 1px solid #dce8f3 !important;
        background-color: #ffffff !important;
        box-shadow: 0 6px 20px -8px rgba(15, 23, 42, 0.12) !important;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease !important;
      }

      .leader-card:hover {
        transform: translateY(-5px) !important;
        border-color: #93c5fd !important;
        box-shadow: 0 16px 32px -10px rgba(15, 23, 42, 0.2) !important;
      }

      /* Reduced photo height and light blue background matching reference */
      .leader-photo-wrap {
        position: relative !important;
        width: 100% !important;
        aspect-ratio: 1 / 0.84 !important;
        background-color: #dcebf7 !important;
        overflow: hidden !important;
        display: flex !important;
        align-items: flex-end !important;
        justify-content: center !important;
        transition: background-color 0.3s ease !important;
      }

      .leader-card:hover .leader-photo-wrap {
        background-color: #d0e4f5 !important;
      }

      .leader-photo-wrap img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: top center !important;
        mix-blend-mode: multiply !important;
        filter: grayscale(100%) contrast(1.04) !important;
        -webkit-filter: grayscale(100%) contrast(1.04) !important;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }

      .leader-card:hover .leader-photo-wrap img {
        transform: scale(1.04) !important;
      }

      /* LinkedIn Button with light sky-blue matching reference */
      .leader-linkedin-btn {
        display: none !important;
        position: absolute !important;
        right: 14px !important;
        top: 14px !important;
        z-index: 10 !important;
        height: 34px !important;
        width: 34px !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 7px !important;
        background-color: #8bb9da !important;
        color: #ffffff !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) !important;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }

      .leader-linkedin-btn svg {
        width: 17px !important;
        height: 17px !important;
        fill: #ffffff !important;
        transition: filter 0.25s ease, transform 0.25s ease !important;
      }

      /* Hover on the card lights up LinkedIn icon bright */
      .leader-card:hover .leader-linkedin-btn {
        background-color: #0077b5 !important;
        box-shadow: 0 4px 14px rgba(0, 119, 181, 0.45) !important;
        transform: scale(1.06) !important;
      }

      .leader-card:hover .leader-linkedin-btn svg {
        filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.8)) !important;
      }

      /* Hover directly on LinkedIn button shines light bright */
      .leader-linkedin-btn:hover {
        background-color: #0096e6 !important;
        box-shadow: 0 6px 18px rgba(0, 150, 230, 0.6) !important;
        transform: scale(1.16) !important;
      }

      .leader-linkedin-btn:hover svg {
        filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.95)) !important;
      }

      /* Compact and sleek bottom bar */
      .leader-info-bar {
        background-color: #07152b !important;
        padding: 14px 14px 16px !important;
        text-align: center !important;
        display: flex !important;
        flex: 1 1 auto !important;
        flex-direction: column !important;
        justify-content: center !important;
      }

      .leader-name {
        color: #ffffff !important;
        font-size: 0.92rem !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
        margin: 0 !important;
        line-height: 1.3 !important;
      }

      .leader-role {
        color: #cbd5e1 !important;
        font-size: 0.8rem !important;
        font-weight: 500 !important;
        margin-top: 5px !important;
      }
    </style>
    @unless(app()->environment('local'))
      <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
          dataLayer.push(arguments);
        }

        (function() {
          let loaded = false;

          const appendScript = (src) => {
            const script = document.createElement("script");
            script.async = true;
            script.src = src;
            document.head.appendChild(script);
          };

          const loadThirdPartyScripts = () => {
            if (loaded) {
              return;
            }

            loaded = true;
            gtag("js", new Date());
            gtag("config", "UA-2727944-76");
            appendScript("https://www.googletagmanager.com/gtag/js?id=UA-2727944-76");
            appendScript("https://www.clarity.ms/tag/mfywvgw4r5");
          };

          const scheduleThirdPartyScripts = () => {
            if ("requestIdleCallback" in window) {
              window.requestIdleCallback(loadThirdPartyScripts, { timeout: 2500 });
              return;
            }

            window.setTimeout(loadThirdPartyScripts, 1500);
          };

          if (document.readyState === "complete") {
            scheduleThirdPartyScripts();
          } else {
            window.addEventListener("load", scheduleThirdPartyScripts, { once: true });
          }
        })();
      </script>
    @endunless
    @php
      $viteEntry = 'resources/js/app.tsx';
      Vite::useHotFile(public_path('hot.bak'));
    @endphp
    @vite($viteEntry)
  </head>
  <body>
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-slate-950">Skip to content</a>
    <div id="root"></div>
  </body>
</html>
