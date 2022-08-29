/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html.{html,js}", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    opacity: ["hover"],
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
};
