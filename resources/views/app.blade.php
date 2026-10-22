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
      $manifestPath = public_path('build/manifest.json');
      $hotCandidates = [public_path('hot'), public_path('hot.bak')];
      $devServerUrl = null;

      foreach ($hotCandidates as $hotCandidate) {
        if (! is_file($hotCandidate)) {
          continue;
        }

        $candidate = trim((string) file_get_contents($hotCandidate));

        if ($candidate !== '') {
          $devServerUrl = rtrim($candidate, '/');
          break;
        }
      }

      $useDevServer = false;

      if ($devServerUrl) {
        $viteClientUrl = $devServerUrl.'/@vite/client';
        $context = stream_context_create([
          'http' => [
            'method' => 'GET',
            'timeout' => 0.35,
            'ignore_errors' => true,
          ],
        ]);

        $headers = @get_headers($viteClientUrl, true, $context);

        if ($headers !== false) {
          $statusLine = is_array($headers) ? ((array_values($headers)[0] ?? '') ?: '') : '';
          $contentType = $headers['Content-Type'] ?? '';

          if (is_array($contentType)) {
            $contentType = end($contentType);
          }

          $statusOk = is_string($statusLine) && str_contains($statusLine, '200');
          $looksLikeVite = is_string($contentType) && (
            str_contains($contentType, 'javascript') ||
            str_contains($contentType, 'text/plain')
          );

          $useDevServer = $statusOk && $looksLikeVite;
        }
      }
    @endphp
   @if ($useDevServer)
  <script type="module" src="{{ $devServerUrl }}/@vite{{ '/client' }}"></script>
  <script type="module" src="{{ $devServerUrl }}/{{ $viteEntry }}"></script>
@elseif (is_file($manifestPath))
  {{ Vite::useHotFile(public_path('hot.bak')) }}
  @vite($viteEntry)
@endif
  </head>
  <body>
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-slate-950">Skip to content</a>
    <div id="root"></div>
  </body>
</html>
