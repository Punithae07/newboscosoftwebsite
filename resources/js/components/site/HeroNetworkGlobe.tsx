const networkNodes = [
  { label: "AI", x: 470, y: 70, sub: "" },
  { label: "ERP", x: 610, y: 150, sub: "" },
  { label: "CLOUD", x: 690, y: 280, sub: "" },
  { label: "DATA", x: 710, y: 410, sub: "" },
  { label: "AUTOMATION", x: 540, y: 335, sub: "" },
  { label: "ANALYTICS", x: 155, y: 370, sub: "" },
  { label: "CRM", x: 215, y: 190, sub: "Connect" },
] as const;

const networkPoints = [
  [215, 190],
  [305, 235],
  [382, 150],
  [470, 70],
  [540, 210],
  [610, 150],
  [690, 280],
  [540, 335],
  [430, 390],
  [315, 350],
  [155, 370],
  [710, 410],
  [555, 455],
  [390, 475],
  [270, 440],
  [475, 285],
  [365, 295],
  [600, 395],
] as const;

const connectingLines = [
  "M215 190 L305 235 L382 150 L470 70 L540 210 L610 150 L690 280 L710 410",
  "M155 370 L270 440 L390 475 L555 455 L710 410",
  "M215 190 L365 295 L540 335 L690 280",
  "M470 70 L475 285 L540 335 L610 150",
  "M305 235 L365 295 L430 390 L540 335",
  "M155 370 L315 350 L430 390 L600 395 L710 410",
  "M382 150 L475 285 L690 280",
  "M270 440 L365 295 L540 210 L690 280",
] as const;

export function HeroNetworkGlobe() {
  const particles = Array.from({ length: 96 }, (_, i) => ({
    cx: 35 + ((i * 47) % 690),
    cy: 48 + ((i * 61) % 430),
    opacity: 0.24 + (i % 5) * 0.12,
    delay: `${(i % 8) * 0.35}s`,
  }));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative hidden min-h-[520px] w-full overflow-visible lg:block"
    >
      <div className="absolute inset-y-0 -left-16 right-0 rounded-full bg-cyan-400/8 blur-2xl" />
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 760 540"
        fill="none"
      >
        <defs>
          <linearGradient id="networkLine" x1="100" x2="720" y1="90" y2="455">
            <stop stopColor="#24d8ff" />
            <stop offset="0.55" stopColor="#2563eb" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="0" cy="0" r="1">
            <stop stopColor="#e0faff" />
            <stop offset="0.38" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="hero-particles">
          {particles.map((dot, i) => (
            <circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r={i % 7 === 0 ? 2 : 1.15}
              fill={i % 4 === 0 ? "#22d3ee" : "#3b82f6"}
              opacity={dot.opacity}
              style={{ animationDelay: dot.delay }}
            />
          ))}
        </g>

        <g opacity="0.82">
          {connectingLines.map((d) => (
            <path key={d} d={d} stroke="url(#networkLine)" strokeWidth="1.1" opacity="0.58" />
          ))}
          {networkPoints.map(([x, y], i) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={i % 4 === 0 ? 4 : 3} fill="#28c8ff" />
          ))}
        </g>

        <g className="hero-globe-lines" opacity="0.92">
          {Array.from({ length: 24 }, (_, i) => (
            <path
              key={i}
              d={`M40 ${500 - i * 4} C185 ${365 - i * 3}, 340 ${610 - i * 8}, 520 ${
                438 - i * 1.8
              } C610 ${352 - i}, 695 ${398 - i * 4}, 760 ${330 - i * 2}`}
              stroke="url(#networkLine)"
              strokeWidth={i % 5 === 0 ? 1.8 : 0.9}
              opacity={0.2 + i * 0.018}
            />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <path
              key={`arc-${i}`}
              d={`M95 ${500 - i * 18} C240 ${405 - i * 8}, 405 ${385 - i * 5}, 720 ${
                455 - i * 24
              }`}
              stroke="#0ea5e9"
              strokeWidth="0.8"
              opacity="0.24"
            />
          ))}
        </g>

        <g filter="url(#softGlow)">
          {networkNodes.map((node) => (
            <g key={node.label}>
              <circle cx={node.x} cy={node.y} r="18" fill="url(#nodeGlow)" opacity="0.9" />
              <circle cx={node.x} cy={node.y} r="7" fill="#0b4eff" stroke="#e0faff" strokeWidth="2" />
              <text
                x={node.x}
                y={node.y - 24}
                textAnchor="middle"
                fill="white"
                fontSize="18"
                fontWeight="800"
              >
                {node.label}
              </text>
              {node.sub && (
                <text
                  x={node.x}
                  y={node.y - 5}
                  textAnchor="middle"
                  fill="rgba(255,255,255,.82)"
                  fontSize="13"
                  fontWeight="500"
                >
                  {node.sub}
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
