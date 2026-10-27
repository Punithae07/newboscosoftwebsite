import {
  GraduationCap,
  BarChart3,
  Users,
  Stethoscope,
  Cloud,
  IndianRupee,
  Handshake,
  Landmark,
  type LucideIcon,
} from "lucide-react";

type Pod = {
  name: string;
  subtitle: string;
  tag: string;
  icon: LucideIcon;
  angle: number; // degrees, -90 = top, clockwise
  hue: string; // tailwind text color for icon
  glow: string; // hex/rgba for base ring + halo
};

const pods: Pod[] = [
  { name: "SmartSchoolNxt", subtitle: "School Management", tag: "AI-Powered",  icon: GraduationCap, angle: -90, hue: "text-sky-300",     glow: "#38bdf8" },
  { name: "HiGrade",         subtitle: "Assessment Suite",   tag: "Integrated",  icon: BarChart3,     angle: -45, hue: "text-emerald-300", glow: "#34d399" },
  { name: "MedSysB",         subtitle: "Hospital System",    tag: "Connected",   icon: Stethoscope,   angle:   0, hue: "text-cyan-300",    glow: "#22d3ee" },
  { name: "Acme.erp",        subtitle: "Enterprise ERP",     tag: "Scalable",    icon: Landmark,      angle:  45, hue: "text-violet-300",  glow: "#a78bfa" },
  { name: "Boscosoft Cloud", subtitle: "Cloud & DevOps",     tag: "Secure",      icon: Cloud,         angle:  90, hue: "text-sky-300",     glow: "#38bdf8" },
  { name: "MicroFund",       subtitle: "Microfinance",       tag: "Trusted",     icon: IndianRupee,   angle: 135, hue: "text-amber-300",   glow: "#fbbf24" },
  { name: "Connect Suite",   subtitle: "Integrations",       tag: "Unified",     icon: Handshake,     angle: 180, hue: "text-fuchsia-300", glow: "#e879f9" },
  { name: "CristO Suite",    subtitle: "NGO & Community",    tag: "Impact",      icon: Users,         angle: 225, hue: "text-teal-300",    glow: "#2dd4bf" },
];

// Tilted orbit (ellipse): radii in %
const ORBIT_RX = 40;
const ORBIT_RY = 28;
const ORBIT_TILT = -10; // deg

function ellipsePoint(angleDeg: number, rx: number, ry: number, tiltDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  const t = (tiltDeg * Math.PI) / 180;
  const ex = Math.cos(a) * rx;
  const ey = Math.sin(a) * ry;
  // rotate by tilt
  const x = ex * Math.cos(t) - ey * Math.sin(t);
  const y = ex * Math.sin(t) + ey * Math.cos(t);
  return { x: 50 + x, y: 50 + y };
}

export function HeroOrbit() {
  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      <div className="relative aspect-[1/0.95] w-full">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute inset-[14%] rounded-full bg-gradient-fluent opacity-25 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />

        {/* SVG orbits + connector lines */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(56,189,248,0.55)" />
              <stop offset="60%" stopColor="rgba(91,95,199,0.18)" />
              <stop offset="100%" stopColor="rgba(125,150,255,0)" />
            </radialGradient>
            <linearGradient id="orbitStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(56,189,248,0.05)" />
              <stop offset="50%" stopColor="rgba(56,189,248,0.85)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0.05)" />
            </linearGradient>
          </defs>

          {/* Central glow disc */}
          <circle cx="50" cy="50" r="22" fill="url(#centerGlow)" />

          {/* 3 tilted elliptical orbit lines */}
          {[
            { rx: ORBIT_RX, ry: ORBIT_RY, tilt: ORBIT_TILT, op: 0.7 },
            { rx: ORBIT_RX - 6, ry: ORBIT_RY - 4, tilt: ORBIT_TILT + 14, op: 0.45 },
            { rx: ORBIT_RX - 12, ry: ORBIT_RY - 8, tilt: ORBIT_TILT - 16, op: 0.35 },
          ].map((o, i) => (
            <g key={i} transform={`rotate(${o.tilt} 50 50)`}>
              <ellipse
                cx="50"
                cy="50"
                rx={o.rx}
                ry={o.ry}
                fill="none"
                stroke="url(#orbitStroke)"
                strokeWidth="0.22"
                opacity={o.op}
              />
            </g>
          ))}

          {/* Connector lines from center to each pod */}
          {pods.map((p) => {
            const { x, y } = ellipsePoint(p.angle, ORBIT_RX, ORBIT_RY, ORBIT_TILT);
            return (
              <line
                key={`l-${p.name}`}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={p.glow}
                strokeWidth="0.18"
                strokeDasharray="0.5 1"
                opacity="0.55"
              />
            );
          })}

          {/* Glowing dots scattered on orbit */}
          {Array.from({ length: 24 }).map((_, i) => {
            const ang = (i / 24) * 360;
            const orbit = i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2;
            const rx = ORBIT_RX - orbit * 6;
            const ry = ORBIT_RY - orbit * 4;
            const tilt = ORBIT_TILT + (orbit === 1 ? 14 : orbit === 2 ? -16 : 0);
            const { x, y } = ellipsePoint(ang, rx, ry, tilt);
            return (
              <g key={`d-${i}`}>
                <circle cx={x} cy={y} r="0.9" fill="rgba(125,211,252,0.18)" />
                <circle
                  cx={x}
                  cy={y}
                  r="0.4"
                  fill="#e0f2fe"
                  style={{ filter: "drop-shadow(0 0 1.2px rgba(125,211,252,1))" }}
                />
              </g>
            );
          })}
        </svg>

        {/* Central sphere (B logo) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Halo */}
            <div className="absolute -inset-10 rounded-full bg-cyan-400/40 blur-3xl animate-soft-pulse" />
            <div className="absolute -inset-6 rounded-full bg-gradient-fluent opacity-50 blur-2xl" />

            {/* Sphere */}
            <div
              className="relative grid h-[clamp(150px,28vw,290px)] w-[clamp(150px,28vw,290px)] place-items-center rounded-full overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 32% 28%, #1e3a8a 0%, #0f1e4d 45%, #050a2a 100%)",
                boxShadow:
                  "0 40px 80px -20px rgba(8,12,40,0.9), 0 0 80px -10px rgba(56,189,248,0.6), inset 0 -20px 50px rgba(0,0,0,0.55), inset 0 10px 30px rgba(125,211,252,0.18)",
              }}
            >
              {/* Wireframe globe lines */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full opacity-40"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="globeGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="rgba(125,211,252,0.5)" />
                    <stop offset="100%" stopColor="rgba(125,211,252,0)" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#globeGrad)" />
                {[15, 25, 35, 45, 50].map((r, i) => (
                  <ellipse
                    key={`v-${i}`}
                    cx="50"
                    cy="50"
                    rx={r}
                    ry="48"
                    fill="none"
                    stroke="rgba(125,211,252,0.35)"
                    strokeWidth="0.2"
                  />
                ))}
                {[10, 22, 34, 46].map((r, i) => (
                  <ellipse
                    key={`h-${i}`}
                    cx="50"
                    cy="50"
                    rx="48"
                    ry={r}
                    fill="none"
                    stroke="rgba(125,211,252,0.3)"
                    strokeWidth="0.2"
                  />
                ))}
              </svg>

              {/* Top highlight */}
              <div
                className="pointer-events-none absolute inset-x-[12%] top-[5%] h-[35%] rounded-[50%] opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(125,211,252,0.85), rgba(125,211,252,0) 70%)",
                }}
              />

              {/* Bottom base shadow */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Center text */}
              <div className="relative flex flex-col items-center text-center leading-none">
                <div
                  className="text-gradient-fluent font-black tracking-tight drop-shadow-[0_0_18px_rgba(56,189,248,0.7)]"
                  style={{ fontSize: "clamp(56px,9vw,108px)", lineHeight: 0.9 }}
                >
                  b
                </div>
                <div
                  className="mt-1 font-bold tracking-[0.18em] text-white"
                  style={{ fontSize: "clamp(11px,1.4vw,17px)" }}
                >
                  BOSCOSOFT
                </div>
                <div
                  className="mt-1 font-medium tracking-wide text-cyan-200/80"
                  style={{ fontSize: "clamp(8px,1vw,11px)" }}
                >
                  Innovate · Integrate · Empower
                </div>
              </div>
            </div>

            {/* Sphere base ring */}
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
              style={{
                bottom: "-6%",
                width: "90%",
                height: "10%",
                background: "radial-gradient(ellipse at center, rgba(56,189,248,0.7), rgba(56,189,248,0) 70%)",
                filter: "blur(4px)",
              }}
            />
          </div>
        </div>

        {/* Product pods on orbit */}
        {pods.map((p, i) => {
          const Icon = p.icon;
          const { x, y } = ellipsePoint(p.angle, ORBIT_RX, ORBIT_RY, ORBIT_TILT);
          return (
            <div
              key={p.name}
              className="absolute animate-float"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                animationDelay: `${(i % 4) * 0.7}s`,
                animationDuration: "7s",
              }}
            >
              <Orb pod={p} Icon={Icon} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Orb({ pod, Icon }: { pod: Pod; Icon: LucideIcon }) {
  return (
    <div className="relative">
      {/* Halo */}
      <div
        className="absolute -inset-3 rounded-full opacity-60 blur-xl"
        style={{ background: `radial-gradient(circle, ${pod.glow}55, transparent 70%)` }}
      />

      {/* Glass sphere */}
      <div
        className="relative h-[clamp(64px,11vw,128px)] w-[clamp(64px,11vw,128px)] rounded-full grid place-items-center overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.18) 0%, rgba(30,58,138,0.55) 45%, rgba(8,15,50,0.92) 100%)",
          boxShadow: `
            0 18px 40px -12px rgba(8,12,40,0.85),
            0 0 28px -2px ${pod.glow}80,
            inset 0 -8px 22px rgba(0,0,0,0.55),
            inset 0 4px 14px rgba(255,255,255,0.18),
            inset 0 0 0 1px ${pod.glow}55
          `,
        }}
      >
        {/* Top highlight */}
        <div
          className="pointer-events-none absolute inset-x-[18%] top-[8%] h-[35%] rounded-[50%] opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.7), rgba(255,255,255,0) 70%)",
          }}
        />

        <div className="relative flex flex-col items-center px-1 text-center leading-tight">
          <Icon
            className={`${pod.hue} drop-shadow-[0_0_10px_currentColor]`}
            style={{ width: "clamp(20px,3vw,34px)", height: "clamp(20px,3vw,34px)" }}
          />
          <div
            className="mt-1 font-bold text-white"
            style={{ fontSize: "clamp(9px,1vw,12px)", lineHeight: 1.05 }}
          >
            {pod.name}
          </div>
          <div
            className="hidden sm:block text-white/70"
            style={{ fontSize: "clamp(8px,0.8vw,10px)", lineHeight: 1.1 }}
          >
            {pod.subtitle}
          </div>
          <div
            className="hidden md:block mt-0.5 font-semibold"
            style={{ fontSize: "clamp(7px,0.75vw,10px)", color: pod.glow }}
          >
            {pod.tag}
          </div>
        </div>
      </div>

      {/* Base glow ring (the holographic stand) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
        style={{
          bottom: "-12%",
          width: "92%",
          height: "16%",
          background: `radial-gradient(ellipse at center, ${pod.glow}, transparent 70%)`,
          filter: "blur(2px)",
          opacity: 0.85,
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%] border"
        style={{
          bottom: "-6%",
          width: "70%",
          height: "8%",
          borderColor: pod.glow,
          opacity: 0.65,
          filter: `drop-shadow(0 0 6px ${pod.glow})`,
        }}
      />
    </div>
  );
}
