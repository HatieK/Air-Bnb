/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize:{
        12:"12px"
      }
    },
  },
  plugins: [require('tailwind-hamburgers')],
  corePlugins: {
    preflight: false,
  },
};
