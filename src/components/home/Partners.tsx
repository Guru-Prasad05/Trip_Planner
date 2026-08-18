export function Partners() {
  const partners = [
    { name: "Odisha Tourism", initials: "OT", color: "bg-forest" },
    { name: "Mayfair Hotels & Resorts", initials: "MH", color: "bg-saffron" },
    { name: "Swosti Group", initials: "SG", color: "bg-river" },
    { name: "Toshali Resorts", initials: "TR", color: "bg-forest" },
    { name: "OTDC", initials: "OT", color: "bg-saffron-deep" },
    { name: "Panthanivas", initials: "PN", color: "bg-river" },
    { name: "Nature Camps India", initials: "NC", color: "bg-forest" },
    { name: "Eco Retreats Odisha", initials: "ER", color: "bg-corporate" },
  ];

  return (
    <section className="relative border-y-2 border-sand bg-ivory py-14 overflow-hidden">
      {/* Subtle topographic line */}
      <svg className="absolute inset-x-0 top-0 w-full h-8 opacity-[0.06] pointer-events-none" viewBox="0 0 1440 32" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,16 Q180,0 360,16 T720,16 T1080,16 T1440,16" fill="none" stroke="#2f4a3c" strokeWidth="1.5"/>
      </svg>

      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex items-center gap-4 mb-8 justify-center">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/50"/>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/40">
            Affiliated Partners &amp; Trusted Hospitality Network
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/50"/>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300
                       hover:-translate-y-0.5"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center ${p.color} text-[11px] font-bold text-white
                           shadow-[3px_3px_0px_0px_rgba(47,74,60,0.2)]
                           group-hover:shadow-[5px_5px_0px_0px_rgba(47,74,60,0.3)]
                           transition-shadow duration-300`}
                style={{ clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))' }}
              >
                {p.initials}
              </div>
              <span className="text-xs font-semibold text-ink/70 group-hover:text-ink transition-colors duration-300">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
