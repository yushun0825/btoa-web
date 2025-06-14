/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./src/app/globals.css"
    ],
    safelist: [
      'animate-pulseSlow',
      'animate-slowWave',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  