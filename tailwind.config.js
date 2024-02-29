/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'poppins-thin': ['Poppins', 'sans-serif'],
        'poppins-extralight': ['Poppins', 'sans-serif'],
        'poppins-light': ['Poppins', 'sans-serif'],
        'poppins-regular': ['Poppins', 'sans-serif'],
        'poppins-medium': ['Poppins', 'sans-serif'],
        'poppins-semibold': ['Poppins', 'sans-serif'],
        'poppins-bold': ['Poppins', 'sans-serif'],
        'poppins-extrabold': ['Poppins', 'sans-serif'],
        'poppins-black': ['Poppins', 'sans-serif'],
        'poppins-thin-italic': ['Poppins', 'sans-serif'],
        'poppins-extralight-italic': ['Poppins', 'sans-serif'],
        'poppins-light-italic': ['Poppins', 'sans-serif'],
        'poppins-regular-italic': ['Poppins', 'sans-serif'],
        'poppins-medium-italic': ['Poppins', 'sans-serif'],
        'poppins-semibold-italic': ['Poppins', 'sans-serif'],
        'poppins-bold-italic': ['Poppins', 'sans-serif'],
        'poppins-extrabold-italic': ['Poppins', 'sans-serif'],
        'poppins-black-italic': ['Poppins', 'sans-serif'],
      },
    },
  
  // screens : {
  //   "xsm" :"200px",
  //   "sm": "640px",
  //   "md" : "750",
  //   "lg" : "1024"
  // },
},
  plugins: [],
}