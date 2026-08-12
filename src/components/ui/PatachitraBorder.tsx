/**
 * Patachitra-inspired decorative elements based on Odisha's traditional art.
 * Key visual elements from the reference:
 * - Multi-layered ornate borders (red/saffron outer, gold inner)
 * - Circular medallion patterns along borders
 * - Rich warm colors: saffron, red, gold, deep green
 * - Geometric dot patterns between border lines
 */

/** 
 * Ornate Patachitra-style border frame around content.
 * Creates the multi-layered effect with corner medallions and dot patterns.
 */
export function PatachitraBorder({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer border — saffron/red */}
      <div className="absolute inset-0 rounded-xl border-[3px] border-orange-600/60" />
      {/* Middle border — gold */}
      <div className="absolute inset-[6px] rounded-lg border-2 border-amber-500/50" />
      {/* Inner border — thin gold */}
      <div className="absolute inset-[12px] rounded-md border border-amber-400/30" />

      {/* Corner medallions */}
      <PatachitraMedallion className="absolute -top-2 -left-2" />
      <PatachitraMedallion className="absolute -top-2 -right-2" />
      <PatachitraMedallion className="absolute -bottom-2 -left-2" />
      <PatachitraMedallion className="absolute -bottom-2 -right-2" />

      {/* Content */}
      <div className="relative p-5 sm:p-6">{children}</div>
    </div>
  );
}

/** Single circular medallion — the signature Patachitra corner element */
function PatachitraMedallion({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${className}`}
      aria-hidden
    >
      {/* Outer ring - red */}
      <circle cx="12" cy="12" r="11" fill="none" stroke="#c2410c" strokeWidth="1.5" />
      {/* Inner ring - gold */}
      <circle cx="12" cy="12" r="8" fill="none" stroke="#d4a437" strokeWidth="1" />
      {/* Center dot - saffron */}
      <circle cx="12" cy="12" r="4" fill="#e8742c" />
      {/* Center highlight */}
      <circle cx="12" cy="12" r="2" fill="#d4a437" />
      {/* Petal dots around */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        // Precomputed positions to avoid hydration mismatch
        const positions: Record<number, [number, number]> = {
          0: [20, 12], 60: [18.93, 18.93], 120: [12, 18.93],
          180: [4, 12], 240: [5.07, 5.07], 300: [12, 5.07],
        };
        const [x, y] = positions[angle];
        return <circle key={angle} cx={x} cy={y} r="1.2" fill="#c2410c" />;
      })}
    </svg>
  );
}

/**
 * Horizontal decorative band in Patachitra style.
 * Repeating circular medallion + dot pattern strip — like the border of the painting.
 */
export function PatachitraBand({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`overflow-hidden py-4 ${className}`}>
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex items-center gap-1">
          {/* Left line */}
          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-transparent via-orange-600/40 to-orange-600/60" />
          
          {/* Center medallions */}
          <div className="flex items-center gap-2 px-3">
            <svg viewBox="0 0 16 16" className="h-4 w-4">
              <circle cx="8" cy="8" r="7" fill="none" stroke="#c2410c" strokeWidth="1" />
              <circle cx="8" cy="8" r="4" fill="#e8742c" />
              <circle cx="8" cy="8" r="2" fill="#d4a437" />
            </svg>
            <svg viewBox="0 0 20 20" className="h-5 w-5">
              <circle cx="10" cy="10" r="9" fill="none" stroke="#d4a437" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="6" fill="none" stroke="#c2410c" strokeWidth="1" />
              <circle cx="10" cy="10" r="3" fill="#e8742c" />
              {[0, 72, 144, 216, 288].map((a, i) => {
                const pts: [number, number][] = [[16,10],[11.9,15.7],[5.1,13.5],[5.1,6.5],[11.9,4.3]];
                return <circle key={a} cx={pts[i][0]} cy={pts[i][1]} r="1" fill="#d4a437" />;
              })}
            </svg>
            {/* Odia script */}
            <span className="font-serif text-sm font-bold text-orange-700/60">ଓଡ଼ିଶା</span>
            <svg viewBox="0 0 20 20" className="h-5 w-5">
              <circle cx="10" cy="10" r="9" fill="none" stroke="#d4a437" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="6" fill="none" stroke="#c2410c" strokeWidth="1" />
              <circle cx="10" cy="10" r="3" fill="#e8742c" />
              {[0, 72, 144, 216, 288].map((a, i) => {
                const pts: [number, number][] = [[16,10],[11.9,15.7],[5.1,13.5],[5.1,6.5],[11.9,4.3]];
                return <circle key={a} cx={pts[i][0]} cy={pts[i][1]} r="1" fill="#d4a437" />;
              })}
            </svg>
            <svg viewBox="0 0 16 16" className="h-4 w-4">
              <circle cx="8" cy="8" r="7" fill="none" stroke="#c2410c" strokeWidth="1" />
              <circle cx="8" cy="8" r="4" fill="#e8742c" />
              <circle cx="8" cy="8" r="2" fill="#d4a437" />
            </svg>
          </div>

          {/* Right line */}
          <div className="h-[3px] flex-1 rounded-full bg-gradient-to-l from-transparent via-orange-600/40 to-orange-600/60" />
        </div>

        {/* Dot pattern below */}
        <div className="mt-2 flex justify-center gap-3">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: i % 2 === 0 ? "#c2410c" : "#d4a437", opacity: 0.4 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Patachitra-inspired section accent — a small decorative element 
 * to place near headings (like the temple finial/kalasha motif).
 */
export function PatachitraAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 60"
      className={`h-10 w-7 ${className}`}
      aria-hidden
    >
      {/* Temple finial / Kalasha shape */}
      <ellipse cx="20" cy="50" rx="8" ry="4" fill="#c2410c" opacity="0.6" />
      <rect x="17" y="25" width="6" height="25" fill="#d4a437" rx="2" />
      <circle cx="20" cy="22" r="6" fill="#e8742c" />
      <circle cx="20" cy="22" r="3" fill="#d4a437" />
      <path d="M17 15 Q20 5 23 15" fill="none" stroke="#c2410c" strokeWidth="1.5" />
      <circle cx="20" cy="8" r="2" fill="#d4a437" />
    </svg>
  );
}
