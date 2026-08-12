"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PortalData } from "./types";
import { themeColors } from "./types";
import { cn } from "@/lib/utils";
import { usePortal } from "./PortalProvider";

const PortalScene = dynamic(() => import("./PortalScene"), { ssr: false });

/**
 * Portal card that triggers the global map-based PortalTransition on click.
 * Connects to PortalProvider for the full-screen warp effect.
 */
export function PortalArch({ portal }: { portal: PortalData }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { enterPortal } = usePortal();
  const { glow } = themeColors[portal.theme];

  // 3D tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    enterPortal(portal.href, portal.theme);
  };

  const isTier1 = portal.tier === 1;

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1200 }}
      className={cn("group relative", isTier1 ? "aspect-[3/4]" : "aspect-[4/5]")}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Pulsing outer glow */}
      <div
        aria-hidden
        className={cn(
          "absolute -inset-[3px] rounded-[2.2rem] blur-sm transition-opacity duration-700",
          hovered ? "opacity-100" : "opacity-30",
        )}
        style={{
          background: `conic-gradient(from 0deg, ${glow}, transparent, ${glow}, transparent, ${glow})`,
          animation: "spin-glow 3s linear infinite",
        }}
      />

      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full overflow-hidden rounded-[2rem]"
      >
        <a
          href={portal.href}
          onClick={handleClick}
          onMouseMove={onMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={onLeave}
          className="relative block h-full w-full outline-offset-4"
          aria-label={`Enter ${portal.label} — ${portal.tagline}`}
        >
          <Image
            src={portal.posterSrc}
            alt={portal.posterAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={cn(
              "object-cover transition-all duration-700",
              hovered ? "scale-110 brightness-105" : "scale-100 brightness-[0.7]",
            )}
          />

          {/* WebGL living scene */}
          {inView && (
            <div className={cn("absolute inset-0 transition-opacity duration-500", hovered ? "opacity-70" : "opacity-40")}>
              <PortalScene theme={portal.theme} />
            </div>
          )}

          {/* Inner arch frame */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-4 rounded-[1.5rem] border-2 transition-all duration-500",
              hovered ? "border-white/50 shadow-[inset_0_0_40px_rgba(255,255,255,0.12)]" : "border-white/15",
            )}
          />

          {/* Center glow on hover */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 transition-all duration-700",
              hovered ? "opacity-100 scale-100" : "opacity-0 scale-50",
            )}
            style={{ background: `radial-gradient(circle at 50% 50%, ${glow}44 0%, transparent 60%)` }}
          />

          {/* Bottom label */}
          <div className={cn(
            "absolute inset-x-0 bottom-0 p-6 transition-all duration-500",
            hovered ? "bg-gradient-to-t from-black/90 via-black/50 to-transparent" : "bg-gradient-to-t from-black/80 via-black/30 to-transparent",
          )}>
            <h3 className={cn(
              "font-[family-name:--font-display] font-bold text-white transition-all duration-500",
              isTier1 ? "text-2xl sm:text-3xl" : "text-xl",
              hovered && "-translate-y-1",
            )}>
              {portal.label}
            </h3>
            <p className="mt-1 text-sm text-white/80">{portal.tagline}</p>
            <span className={cn(
              "mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-500",
              hovered ? "text-white gap-3" : "text-[--color-gold] gap-2",
            )}>
              Enter Portal
              <span aria-hidden className={cn("inline-block text-lg transition-all duration-300", hovered && "translate-x-2")}>⟶</span>
            </span>
          </div>
        </a>
      </motion.div>
    </motion.div>
  );
}

export function PortalGrid({ portals }: { portals: PortalData[] }) {
  return (
    <div className={cn(
      "mx-auto grid max-w-[1280px] gap-8 px-6",
      portals.length === 4 ? "sm:grid-cols-2 lg:gap-10" : "sm:grid-cols-2 lg:grid-cols-3",
    )}>
      {portals.map((p) => (
        <PortalArch key={p.href} portal={p} />
      ))}
    </div>
  );
}
