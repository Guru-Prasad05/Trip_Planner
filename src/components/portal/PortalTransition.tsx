"use client";

import { motion, AnimatePresence } from "framer-motion";

/**
 * Simple, reliable portal transition overlay.
 * Just a quick dark overlay with a compass + route animation.
 * The PortalProvider handles all navigation timing  -  this is purely visual.
 */
export function PortalTransition({
  active,
  color = "#74ccf4",
}: {
  active: boolean;
  color?: string;
  onComplete?: () => void;
}) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a1410]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Content */}
          <div className="flex flex-col items-center gap-5">
            {/* Spinning compass */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
                <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1" opacity="0.4" />
                <circle cx="24" cy="24" r="15" stroke="#d4a437" strokeWidth="0.8" opacity="0.6" />
                <path d="M24 6 L26 24 L24 22 L22 24 Z" fill="#d4a437" />
                <path d="M24 42 L26 24 L24 26 L22 24 Z" fill="white" opacity="0.4" />
                <circle cx="24" cy="24" r="2.5" fill={color} />
              </svg>
            </motion.div>

            {/* Route dots */}
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
              <motion.div
                className="h-[1.5px] bg-amber-500"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              />
            </div>

            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">
              Traveling...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
