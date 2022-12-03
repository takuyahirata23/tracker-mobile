/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#94a3b8',
        tertiary: '#0ea4e9',
        'bg-primary': '#0f172a',
        'bg-secondary': '#1e293b',
        'btn-primary': '#0ea5e9',
        'btn-secondary': '#334155',
      },
      fontFamily: {
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
