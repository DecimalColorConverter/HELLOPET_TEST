/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#FFCE56',
          'yellow-light': '#FFE08A',
          'yellow-dark': '#E5B84D',
        },
      },
    },
  },
  plugins: [],
}
