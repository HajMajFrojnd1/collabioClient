/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      orange: "#ef6a36",
      gray: "#F7F7F7",
      main: "#24252d",
      blackT: "#00000040",
      blackTT: "#000000A0",
      mainShade: "#3b3e48",
      other: "#949bb3",
      transparent: "transparent",
      error: "#f73636",
      success: "#17d43d",
      mainDark: "#202129",
    },
    fontFamily: {
      "large": ['Poppins', 'sans-serif'],
      "normal": ['Rubik', 'sans-serif' ]
    },
    extend: {
      spacing: {
        '128': '32rem',
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '8': 'repeat(8, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        // Simple 8 row grid
        '8': 'repeat(8, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
    },
  },
  plugins: [],
}

