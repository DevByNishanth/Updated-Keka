/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        bebas: ['Bebas Neue', 'cursive'],
        cedarville: ['Cedarville Cursive', 'cursive'],
        dancing: ['Dancing Script', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
