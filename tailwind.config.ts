import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4A12A", // Primary Gold
          light: "#E7C768", // Accent Gold
        },
        navy: {
          DEFAULT: "#0B234B", // Primary Navy
          deep: "#081a3a",
        },
        ink: "#444444", // Dark Gray body text
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(11, 35, 75, 0.25)",
        gold: "0 8px 30px -8px rgba(212, 161, 42, 0.45)",
      },
      backgroundImage: {
        "navy-gradient":
          "radial-gradient(1200px 600px at 15% -10%, #12305f 0%, #0B234B 45%, #081a3a 100%)",
        "gold-gradient": "linear-gradient(135deg, #E7C768 0%, #D4A12A 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
