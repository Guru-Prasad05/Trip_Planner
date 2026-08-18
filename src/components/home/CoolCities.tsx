"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CityPill {
  name: string;
  imageSrc: string;
  href: string;
}

export function CoolCities({ title, cities }: { title: string; cities: CityPill[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex items-center gap-4 mb-10 justify-center">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/50"/>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/40">{title}</p>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/50"/>
        </div>

        <div className="flex justify-center gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={city.href}
                className="group relative flex h-28 w-28 shrink-0 flex-col items-center justify-end overflow-hidden sm:h-32 sm:w-32
                         shadow-[5px_5px_0px_0px_rgba(47,74,60,0.1)]
                         hover:shadow-[8px_8px_0px_0px_rgba(47,74,60,0.18)]
                         hover:-translate-x-0.5 hover:-translate-y-0.5
                         transition-all duration-400"
                style={{ clipPath: i % 3 === 0
                  ? 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                  : i % 3 === 1
                  ? 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
                  : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                <Image
                  src={city.imageSrc}
                  alt={city.name}
                  fill
                  sizes="128px"
                  className="object-cover transition-transform duration-600 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent" />

                {/* Small gold accent */}
                <div className="absolute top-3 left-3 w-4 h-[1.5px] bg-gold/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                <span className="relative z-10 pb-3 text-[10px] font-bold uppercase tracking-wider text-white drop-shadow-md">
                  {city.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
