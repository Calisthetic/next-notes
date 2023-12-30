import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {        
        primary: "var(--color-primary)",
        primaryHover: "var(--color-primary-hover)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        neutral: "var(--color-neutral)",
        borders: "var(--color-borders)",
        text: "var(--color-font)",
        buttons: "var(--color-buttons)",
        buttonsHover: "var(--color-buttons-hover)",
        icons: "var(--color-icons)",
        shadows: "var(--color-shadows)",
        info: "var(--color-info)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        roundedBtn: "var(--value-rounded-btn)",
        roundedBox: "var(--value-rounded-box)",
        borderWidth: "var(--value-border-width)",
      },
    },
  },
  plugins: [
    function ({addVariant}:any) {
      addVariant('child', '&>*');
      addVariant('child-hover', '&>*:hover');
    }],
}
export default config
