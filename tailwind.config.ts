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
      },
      animation: {
        "spin-glow": "spin-glow 3s linear infinite",
        "scroll-line": "scroll-line 1.5s ease-in-out infinite",
        "portal-ring": "portal-ring 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
