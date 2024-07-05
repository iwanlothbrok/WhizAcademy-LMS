/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ], theme: {
    extend: {},
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  plugins: [],
}

