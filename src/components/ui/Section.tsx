import { cn } from "@/lib/utils";

/** Generic content section wrapper with consistent rhythm. */
export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-6 py-20", className)}>
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}

import { PatachitraBand } from "./PatachitraBorder";

export function PatachitraDivider() {
  return <PatachitraBand />;
}
