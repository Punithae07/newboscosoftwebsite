import { Link } from "@tanstack/react-router";
import { Suspense, startTransition, useEffect, useRef, useState } from "react";
import { lazyWithRetry } from "@/lib/lazy-with-retry";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePageDeferred = lazyWithRetry("HomePageDeferred", () =>
  import("./HomePageDeferred").then((module) => ({
    default: module.HomePageDeferred,
  })),
);

export function HomePage({
  heroVideoUrl,
  heroPosterUrl,
}: {
  heroVideoUrl: string;
  heroPosterUrl: string;
}) {
  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const browserWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const revealVideo = () => {
      startTransition(() => {
        setShowHeroVideo(true);
      });
    };

    const scheduleVideo = () => {
      if (browserWindow.requestIdleCallback && browserWindow.cancelIdleCallback) {
        idleId = browserWindow.requestIdleCallback(revealVideo, { timeout: 1200 });
        return;
      }

      timeoutId = window.setTimeout(revealVideo, 400);
    };

    if (document.readyState === "complete") {
      scheduleVideo();
    } else {
      window.addEventListener("load", scheduleVideo, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleVideo);

      if (idleId !== undefined) {
        browserWindow.cancelIdleCallback?.(idleId);
      }

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!showHeroVideo || !video) {
      return;
    }

    const ensurePlayback = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Ignore autoplay rejection; browser may retry after media is ready.
        });
      }
    };

    ensurePlayback();

    const handleCanPlay = () => {
      setHeroVideoReady(true);
      ensurePlayback();
    };
    const handleLoadedData = () => setHeroVideoReady(true);
    const handleError = () => setHeroVideoReady(false);
    const handlePageShow = () => ensurePlayback();
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        ensurePlayback();
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [showHeroVideo]);

  return (
    <>
      <section
        className="relative overflow-hidden text-white hero-hero-background"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7,18,54,0.96) 0%, rgba(10,47,120,0.82) 56%, rgba(11,60,152,0.72) 100%), url(${heroPosterUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(54,125,255,0.30),transparent_24%),radial-gradient(circle_at_82%_16%,rgba(0,191,255,0.18),transparent_22%)]" aria-hidden="true" />
        {showHeroVideo ? (
          <video
            ref={heroVideoRef}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${heroVideoReady ? "opacity-100" : "opacity-0"}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroPosterUrl}
            aria-hidden="true"
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        ) : null}
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" style={{ background: "linear-gradient(to right, rgba(5,15,58,0.95) 0%, rgba(7,26,94,0.88) 34%, rgba(7,26,94,0.68) 52%, rgba(7,26,94,0.42) 68%, rgba(7,26,94,0.18) 84%, rgba(7,26,94,0.08) 100%)" }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 md:pb-12 md:pt-16 lg:px-8 lg:pb-16 lg:pt-20">
          <div
            aria-hidden="true"
            className="h-[338px] min-[420px]:h-[182px] sm:h-[118px] lg:h-[90px]"
          />
          <div className="max-w-6xl animate-slide-right lg:max-w-[67rem]">
            <div className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="text-sm font-medium tracking-wide text-white/92">Enterprise Software Engineering</span>
              <span aria-hidden="true" className="text-sm text-white/55">|</span>
              <span className="text-sm font-medium tracking-wide text-white/92">Applied AI</span>
              <span aria-hidden="true" className="text-sm text-white/55">|</span>
              <span className="text-sm font-medium tracking-wide text-white/92">SaaS Platforms</span>
            </div>

            <h1 className="t-display max-w-6xl text-white lg:max-w-none">
              <span className="text-white">Engineering What’s Next</span>
              <span className="block text-white">Empowering Who’s Next</span>
            </h1>

            <p className="mt-5 max-w-4xl text-[18px] leading-8 text-white">
              We deliver expert engineering talent to build AI-powered workflows, modern SaaS, and connected data platforms tailored to your long-term growth.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="hidden bg-white text-primary hover:bg-white/90 shadow-glow lg:inline-flex"
              >
                <Link to="/contact-us" preload="intent">
                  Talk to Our Experts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-md"
              >
                <Link to="/products">
                  Explore Our Platforms <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative z-10 h-[338px] min-[420px]:h-[182px] sm:h-[118px] lg:h-[90px]"
        />
      </section>

      <Suspense fallback={<HomePageDeferredFallback />}>
        <HomePageDeferred />
      </Suspense>
    </>
  );
}

function HomePageDeferredFallback() {
  return (
    <div aria-hidden="true" className="bg-background">
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-6 w-40 animate-pulse rounded-full bg-slate-200/80" />
          <div className="mx-auto mt-5 h-11 w-full max-w-2xl animate-pulse rounded-2xl bg-slate-200/80" />
          <div className="mx-auto mt-4 h-6 w-full max-w-3xl animate-pulse rounded-xl bg-slate-100" />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={`intro-card-skeleton-${index}`}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="h-6 w-32 animate-pulse rounded-full bg-slate-200/80" />
              <div className="mt-5 h-11 w-4/5 animate-pulse rounded-2xl bg-slate-200/80" />
              <div className="mt-4 h-24 animate-pulse rounded-2xl bg-slate-100" />
              <div className="mt-6 h-11 w-44 animate-pulse rounded-full bg-slate-200/80" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
