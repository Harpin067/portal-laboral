import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A56DB',
        secondary: '#10B981',
        background: '#F9FAFB',
        foreground: '#111827',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
};
export default config;
