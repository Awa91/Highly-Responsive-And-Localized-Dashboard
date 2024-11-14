/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      fontFamily:{
        poppins: ["Poppins"],
        satistfy:["Satisfy"],
      },
      textColor:{
        'primary':'#87CEEB',
        'secondary':'#2D2604',
        'title':'#059669',
        'subtitle':'',
        'text1':'#a3a3a3',
        'text2':'#262626',
        'light':'#000000',
        'dark':'#ffffff',
        'contrast':'#0146B1',
        
      },width:{
        stepper:"600px",
      },
      backgroundColor:{
        primary: "#87CEEB",
        secondary:"#b7e2f3",
        inActiveStep:"#cdcdcd",
        light:'#ffffff',
        dark: '#000000',
        subscription:"#D6E1F3",
        
      },
      borderColor:{
        primary: "#87CEEB",
        secondary:"#b7e2f3",
        category:'#cdcdcd'
      },
      
    },
  },
  plugins: [],
}

