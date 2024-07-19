/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "side-image": "url(./src/assets/images/sideimg.jpg)",
      }
    },
  },
  plugins: [],
}