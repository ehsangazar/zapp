import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      customFont: ["Poppins"],
    },
  },
  plugins: [],
} satisfies Config;
