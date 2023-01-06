/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "red-waves": "url('/public/bgimg.jpg')",
      },
    },
    fontFamily: {
      alfa: ["Alfa Slab One"],
    },
  },
  plugins: [],
}
