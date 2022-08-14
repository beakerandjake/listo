/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        'menu': '10',
        'submenu': '11'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-radix')(),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  }
}
