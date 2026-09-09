import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { background: "#0c1014", foreground: "#e9edef", primary: "#85edb8", border: "#242b30", muted: "#8b969e" },
    fontFamily: { sans: ["Inter", "Arial", "Helvetica", "sans-serif"], mono: ["SFMono-Regular", "Consolas", "monospace"] },
  } },
  plugins: [],
} satisfies Config;
