import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        icon: "var(--icon)",
        input: {
          DEFAULT: "var(--input)",
          foreground: "var(--input-foreground)",
        },
        button: {
          DEFAULT: "var(--button)",
          foreground: "var(--button-foreground)",
        },
        "button-hover": "var(--button-hover)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
      },
    },
  },
  plugins: [
    function ({addVariant}:any) {
      addVariant('child', '&>*');
      addVariant('child-hover', '&>*:hover');
    },
  ],
} satisfies Config

export default config