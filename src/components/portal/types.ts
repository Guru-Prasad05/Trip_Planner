import type { SectionTheme } from "@/lib/site";

export interface PortalData {
  tier: 1 | 2;
  label: string;
  tagline: string;
  href: string;
  theme: SectionTheme;
  posterSrc: string;
  posterAlt: string;
}

/** Per-theme accent colors used by the 3D scene + arch glow. */
export const themeColors: Record<SectionTheme, { base: string; glow: string }> = {
  nature: { base: "#2f4a3c", glow: "#74ccf4" },
  corporate: { base: "#324158", glow: "#e8742c" },
  celebration: { base: "#c13a6b", glow: "#d4a437" },
  spiritual: { base: "#a1887f", glow: "#e8742c" },
};
