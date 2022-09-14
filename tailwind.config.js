/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'rubik': ['Rubik', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        'dark-purple': '#4263EB',
        'light-white': '#748FFC',
        'dark-theme': '#EDF2FF',
        'white-write': '#dee2e6',
        'blue-write': '#4263EB',
        125: '#4263EB'
      },
      spacing: {
        128: '73rem'
      }
    }
  },
  plugins: []
}
