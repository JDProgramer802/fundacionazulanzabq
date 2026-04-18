import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(238, 132, 181)", // #EE84B5
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "rgb(3, 86, 203)", // #0356CB
          foreground: "#FFFFFF",
        },
        background: "#FFFFFF",
        foreground: "#1f2937",
        muted: {
          DEFAULT: "#F9FAFB",
          foreground: "#6b7280",
        },
      },
      fontFamily: {
        primary: ["Champagne & Limousines", "sans-serif"],
        body: ["Inter", "Plus Jakarta Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(to right, rgb(238, 132, 181), rgb(3, 86, 203))",
      },
    },
  },
  plugins: [],
};
export default config;
