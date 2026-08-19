"use client";

interface ContactItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  href: string;
  icon: "phone" | "email" | "whatsapp" | "map";
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.84a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.846L0 24l6.335-1.502A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.003-1.374l-.36-.213-3.76.89.952-3.658-.234-.374A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function getIcon(icon: ContactItem["icon"]) {
  switch (icon) {
    case "phone": return <PhoneIcon />;
    case "email": return <EmailIcon />;
    case "whatsapp": return <WhatsAppIcon />;
    case "map": return <MapPinIcon />;
  }
}

export function ContactCards({ items }: { items: ContactItem[] }) {
  return (
    <ul className="mt-8 space-y-4" role="list">
      {items.map(({ id, label, value, sub, href, icon }) => (
        <li key={id}>
          <a
            href={href}
            target={id === "address" || id === "whatsapp" ? "_blank" : undefined}
            rel={id === "address" || id === "whatsapp" ? "noopener noreferrer" : undefined}
            className="group flex items-start gap-4 rounded-2xl p-5 transition-all duration-200"
            style={{
              background: "color-mix(in srgb, var(--color-ink) 96%, var(--color-saffron) 4%)",
              border: "1px solid color-mix(in srgb, var(--color-saffron) 12%, transparent)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.35), 0 0 0 1px color-mix(in srgb, var(--color-saffron) 25%, transparent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.25)";
            }}
          >
            {/* Icon circle */}
            <div
              className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "color-mix(in srgb, var(--color-saffron) 15%, transparent)",
                color: "var(--color-saffron)",
              }}
            >
              {getIcon(icon)}
            </div>

            {/* Text content */}
            <div className="min-w-0 flex-1">
              <div
                className="text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: "color-mix(in srgb, var(--color-saffron) 75%, white)" }}
              >
                {label}
              </div>
              <div
                className="mt-1 text-base font-semibold leading-snug"
                style={{ color: "var(--color-ivory)" }}
              >
                {value}
              </div>
              {sub && (
                <div
                  className="mt-0.5 text-xs"
                  style={{ color: "color-mix(in srgb, var(--color-ivory) 50%, transparent)" }}
                >
                  {sub}
                </div>
              )}
            </div>

            {/* Arrow indicator */}
            <div
              className="ml-auto mt-1 shrink-0 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
              style={{ color: "var(--color-saffron)" }}
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
