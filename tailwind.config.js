/** @type {import('tailwindcss').Config} */

import Colors from "./src/Config/Colors.js";
import colors from "./src/Config/Colors.js";

const bgColor = Object.keys(Colors).map((key) => {
  return `bg-${key}`;
});

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: bgColor,
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        350: "50rem",
        270: "44rem",
        250: "42rem",
        230: "41rem",
        210: "40rem",
        190: "46rem",
        180: "39rem",
        130: "30rem",
        75: "19rem",
      },
      height: { 130: "30rem" },
      colors: { ...colors },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
