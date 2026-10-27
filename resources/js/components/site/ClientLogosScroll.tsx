interface ClientLogosScrollProps {
  clients: {
    name: string;
    location?: string;
    logo: string;
  }[];
}

function LogoCard({ client }: { client: ClientLogosScrollProps["clients"][number] }) {
  const clientLabel = client.location ? `${client.name}, ${client.location}` : client.name;

  return (
    <div
      title={clientLabel}
      className="group flex h-28 w-36 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-background p-3.5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-elegant sm:h-32 sm:w-44 sm:p-5"
    >
      <img
        src={client.logo}
        alt={client.name}
        width={240}
        height={120}
        className="max-h-20 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-24 sm:max-w-[88%]"
        loading="lazy"
      />
    </div>
  );
}

export function ClientLogosScroll({ clients }: ClientLogosScrollProps) {
  // Ensure enough items so the 50% translation marquee loops seamlessly on large screens
  const normalizedClients =
    clients.length > 0 && clients.length < 6
      ? [...clients, ...clients]
      : clients;

  return (
    <div className="relative overflow-hidden py-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-surface to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-surface to-transparent sm:w-20" />

      <div
        tabIndex={0}
        className="client-logos-marquee flex w-max py-3"
        aria-label="Client logos carousel"
        aria-description="Auto-scrolling client logos."
      >
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6"
            aria-hidden={groupIndex === 1}
          >
            {normalizedClients.map((client, index) => (
              <LogoCard
                key={`${groupIndex}-${client.name}-${client.location ?? "na"}-${index}`}
                client={client}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

