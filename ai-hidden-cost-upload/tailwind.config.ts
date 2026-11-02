import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        void: "#030712",
        abyss: "#0A1329",
        surface: {
          DEFAULT: "#0B1528",
          subtle: "rgba(11, 21, 40, 0.6)",
          glass: "rgba(15, 23, 42, 0.75)",
        },
        cyan: {
          DEFAULT: "#38BDF8",
          glow: "rgba(56, 189, 248, 0.25)",
        },
        freshwater: "#0284C7",
        caution: "#F59E0B",
        diversity: "#10B981",
      },
      fontFamily: {
        serif: ["Charter", "Playfair Display", "Georgia", "Cambria", "'Times New Roman'", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(56, 189, 248, 0.25)",
        "glow-lg": "0 0 45px rgba(56, 189, 248, 0.35)",
        "amber-glow": "0 0 25px rgba(245, 158, 11, 0.25)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
