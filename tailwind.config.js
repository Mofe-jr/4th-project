/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './app.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#8b5cf6',
          hover: '#a78bfa',
          dark: '#5b21b6'
        },
        surface: {
          base: '#121212',
          elevated: '#181818',
          highlight: '#282828'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif']
      }
    }
  }
};
