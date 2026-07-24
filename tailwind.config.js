/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0e1e',
          secondary: '#0d1326',
          card: '#131929',
          'card-hover': '#1a2338',
        },
        accent: {
          DEFAULT: '#00d4c8',
          2: '#00bfa5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
