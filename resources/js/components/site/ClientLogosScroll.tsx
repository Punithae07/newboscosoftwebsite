interface ClientLogosScrollProps {
  clients: {
    name: string;
    location?: string;
    logo: string;
  }[];
}

function LogoCard({ client }: { client: ClientLogosScrollProps["clients"][number] }) {
  return (
    <div className="flex min-h-24 w-[6.5rem] shrink-0 flex-col items-center justify-center rounded-xl border border-border bg-background p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant sm:w-[7.5rem]">
      <img
        src={client.logo}
        alt={client.name}
        width={240}
        height={120}
        className="max-h-12 max-w-full object-contain sm:max-h-14"
        loading="lazy"
      />
      <div className="mt-2 w-full px-1 text-center text-[0.75rem] leading-5 text-muted-foreground line-clamp-2">
        {client.name}
        {client.location ? `, ${client.location}` : ""}
      </div>
    </div>
  );
}

export function ClientLogosScroll({ clients }: ClientLogosScrollProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-surface to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-surface to-transparent sm:w-16" />

      <div
        tabIndex={0}
        className="client-logos-marquee flex w-max py-2"
        aria-label="Client logos carousel"
        aria-description="Auto-scrolling client logos."
      >
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6"
            aria-hidden={groupIndex === 1}
          >
            {clients.map((client) => (
              <LogoCard
                key={`${groupIndex}-${client.name}-${client.location ?? "na"}`}
                client={client}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
