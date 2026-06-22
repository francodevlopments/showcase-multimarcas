import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#11110f",
        coal: "#1d1c1a",
        mist: "#f6f4ef",
        sand: "#ded3bd",
        flax: "#c9b893",
        olive: "#606c38",
        brass: "#b59a5a",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(17, 17, 15, 0.10)",
        lift: "0 16px 32px rgba(17, 17, 15, 0.12)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
