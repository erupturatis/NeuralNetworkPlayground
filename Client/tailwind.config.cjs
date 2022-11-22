/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nav: ["'M PLUS 1p'", ' sans-serif'],
      },
      colors: {
        bgdefault: '#03060A',
        textgradBlue1: '#7DEBF2',
        textgradBlue2: '#60A4FF',
        textLowPrioBlue: '#B0ECFF',
        navtextFaded: '#787878',
        navButtonBlue: '#007DD8',
      },
    },
  },
  plugins: [],
};
