const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"], // Font default untuk seluruh teks
        viga: ["var(--font-viga)", "sans-serif"], // Font khusus untuk heading/judul
      },
    },
  },
};

export default config;
