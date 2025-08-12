/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#d4232a",
        "warm-yellow": "#f7b731",
        "off-white": "#f8f7f5",
        "dark-text": "#2a2a2a",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        serif: ["Merriweather", "serif"],
        logo: ["Barriecito", "cursive"],
      },
    },
  },
  plugins: [],
};
