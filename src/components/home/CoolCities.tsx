"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CityPill {
  name: string;
  imageSrc: string;
  href: string;
}

/**
 * Horizontal row of small rounded destination pills (like the "Cool Cities" row in reference).
 */
export function CoolCities({ title, cities }: { title: string; cities: CityPill[] }) {
  return (
    <section className="py-16">
      <p className="text-center text-xs font-medium uppercase tracking-[0.4em] text-[--color-ink]/40">
        {title}
      </p>
      <div className="mt-8 flex justify-center gap-4 overflow-x-auto px-6 pb-4" style={{ scrollbarWidth: "none" }}>
        {cities.map((city, i) => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              href={city.href}
              className="group relative flex h-28 w-28 shrink-0 flex-col items-center justify-end overflow-hidden rounded-2xl sm:h-32 sm:w-32"
            >
              <Image
                src={city.imageSrc}
                alt={city.name}
                fill
                sizes="128px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="relative z-10 pb-2 text-[10px] font-bold uppercase tracking-wider text-white">
                {city.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
