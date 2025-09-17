const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
export default withMT(
  {
    content: [
          "./src/**/*.{js,jsx,ts,tsx}",
          "./index.html",
      "node_modules/flowbite/**/*.js"
    ],
    theme: {
      extend: {
        colors:{
          brandBrown: "#5E2C05",
          brandRed: "#BC3434"
        },
        backgroudImage:{
          'low-resolution-hero-cover':"url(/src/assets/website cover blur 100.png)"
        },
        fontFamily: {
          futura: ['Futura'],
        },
      },
    },
    plugins: [require('flowbite/plugin')]
  }
)
