import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep corporate navy family
        navy: {
          DEFAULT: "#0B192C",
          deep: "#060F1C",
          surface: "#0F2135",
          line: "#1C2E44",
        },
        // Metallic champagne gold
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E6C972",
        },
        // Crisp slate + off-white neutrals
        snow: "#F4F7FB",
        mist: "#AEBAC9",
        ink: "#AEBAC9",
      },
      fontFamily: {
        // Elegant serif for display / headings
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.3), 0 20px 40px -24px rgba(0, 0, 0, 0.6)",
        gold: "0 2px 18px -4px rgba(212, 175, 55, 0.45)",
        lift: "0 24px 50px -20px rgba(0, 0, 0, 0.7)",
      },
      borderRadius: {
        none: "0",
      },
      backgroundImage: {
        "navy-gradient":
          "radial-gradient(1200px 600px at 15% -10%, #12263f 0%, #0B192C 45%, #060F1C 100%)",
        "gold-gradient": "linear-gradient(135deg, #E6C972 0%, #D4AF37 100%)",
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
