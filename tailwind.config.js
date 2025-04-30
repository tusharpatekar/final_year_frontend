/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        green: {
          600: '#2E7D32',
          700: '#1B5E20',
          800: '#0D3B0D',
        },
      },
      backgroundColor: {
        dark: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
          surface: '#333333',
        },
      },
      textColor: {
        dark: {
          primary: '#ffffff',
          secondary: '#e5e5e5',
        },
      },
    },
  },
  plugins: [],
}
