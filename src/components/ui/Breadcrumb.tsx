import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export function Breadcrumb({ items }: { items: { name: string; href: string }[] }) {
  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1280px] px-6 py-4 text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-[--color-ink]/60">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i < items.length - 1 ? (
                <Link href={item.href} className="hover:text-[--color-saffron]">
                  {item.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-[--color-ink]">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
