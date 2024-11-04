/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'hind': ['Hind Siliguri', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'lexend': ['Lexend Exa', 'sans-serif'],
        'prompt': ['Prompt', 'sans-serif'],
      },
    },
  },
  plugins: [],
}