/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
    "./src/state/**/*.{js,ts,jsx,tsx}",
    "./src/views/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        tan: "#fff",
        ban: "#EBF2F4",
        greey: "#c9c9c4",
        primary: "#50C878",
        primaryBg: "#D5FADC",
        secondary: "#F3BA2F",
        secondaryBg: "#FEF8EA",
        accent: "#8F92A1",
        accentBg: "#F6F6F6",
      },
    },
  },
  // plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
  // variants: {
  //   scrollbar: ["rounded"],
  // },
}
