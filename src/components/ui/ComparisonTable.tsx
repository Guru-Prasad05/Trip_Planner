/** Responsive package comparison — real HTML table (crawlable), stacks on mobile. */
export function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mx-auto max-w-4xl overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b-2 border-[--color-gold]/40">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-[family-name:--font-display] font-semibold text-[--color-ink]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[--color-gold]/20">
              {row.map((cell, j) => (
                <td key={j} className={j === 0 ? "px-4 py-3 font-medium text-[--color-ink]" : "px-4 py-3 text-[--color-ink]/75"}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
