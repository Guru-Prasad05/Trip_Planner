/**
 * Affiliated Partners section with logo-style badges.
 */
export function Partners() {
  const partners = [
    { name: "Odisha Tourism", initials: "OT", color: "bg-emerald-700" },
    { name: "Mayfair Hotels & Resorts", initials: "MH", color: "bg-amber-700" },
    { name: "Swosti Group", initials: "SG", color: "bg-blue-800" },
    { name: "Toshali Resorts", initials: "TR", color: "bg-green-700" },
    { name: "OTDC", initials: "OT", color: "bg-orange-700" },
    { name: "Panthanivas", initials: "PN", color: "bg-teal-700" },
    { name: "Nature Camps India", initials: "NC", color: "bg-lime-800" },
    { name: "Eco Retreats Odisha", initials: "ER", color: "bg-cyan-800" },
  ];

  return (
    <section className="border-y border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-[1280px] px-6">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
          Affiliated Partners & Trusted Hospitality Network
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex items-center gap-2.5 opacity-70 transition-opacity hover:opacity-100"
            >
              {/* Logo badge */}
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${p.color} text-[11px] font-bold text-white shadow-sm`}>
                {p.initials}
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-700 group-hover:text-gray-900">
                  {p.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
