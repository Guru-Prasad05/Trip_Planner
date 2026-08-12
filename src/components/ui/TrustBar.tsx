const stats = [
  { value: "500+", label: "Happy Travellers" },
  { value: "50+", label: "Local Partners" },
  { value: "100%", label: "Customised" },
  { value: "4", label: "Categories" },
  { value: "24/7", label: "Support" },
];

export function TrustBar() {
  return (
    <div className="relative z-20 mx-auto -mt-12 max-w-[1100px] px-6">
      <div className="grid grid-cols-2 gap-4 rounded-[--radius-card] border border-[--color-gold]/30 bg-[--color-ivory]/95 p-6 shadow-[--shadow-warm] backdrop-blur md:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-[family-name:--font-display] text-3xl font-semibold text-[--color-saffron]">
              {s.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-[--color-ink]/60">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
