import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1a1410",
        saffron: { DEFAULT: "#e8742c", deep: "#c2410c" },
        "temple-stone": "#a1887f",
        river: { DEFAULT: "#2a6f84", light: "#74ccf4" },
        forest: "#2f4a3c",
        sand: "#f4ebdd",
        gold: "#d4a437",
        ivory: "#fbf7f0",
        corporate: "#324158",
        celebration: "#c13a6b",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        accent: ["Fraunces", "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        "hero-primary": "clamp(3.5rem, 9vw, 7rem)",
        "hero-accent": "clamp(4rem, 11vw, 8.5rem)",
        "section-title": "clamp(2.2rem, 5vw, 3.8rem)",
        "card-title": "clamp(1.1rem, 2.5vw, 1.5rem)",
      },
      letterSpacing: {
        nature: "0.02em",
        trust: "0.15em",
      },
      borderRadius: {
        card: "1.25rem",
        button: "0.75rem",
      },
      boxShadow: {
        warm: "0 20px 60px -20px rgba(26, 20, 16, 0.35)",
      },
      keyframes: {
        "spin-glow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scroll-line": {
          "0%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "portal-ring": {
          "0%": { transform: "scale(0.5)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "organic-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1deg)" },
          "66%": { transform: "translateY(4px) rotate(-1deg)" },
        },
        "organic-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
        },
        "ripple-out": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "50%": { opacity: "0.3" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        "geometry-reveal": {
          "0%": { clipPath: "circle(0% at 50% 50%)", opacity: "0" },
          "100%": { clipPath: "circle(100% at 50% 50%)", opacity: "1" },
        },
        "border-grow": {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "spin-glow": "spin-glow 3s linear infinite",
        "scroll-line": "scroll-line 1.5s ease-in-out infinite",
        "portal-ring": "portal-ring 2s ease-out infinite",
        "organic-float": "organic-float 6s ease-in-out infinite",
        "organic-pulse": "organic-pulse 4s ease-in-out infinite",
        "ripple-out": "ripple-out 2s ease-out infinite",
        "geometry-reveal": "geometry-reveal 0.8s ease-out forwards",
        "border-grow": "border-grow 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
