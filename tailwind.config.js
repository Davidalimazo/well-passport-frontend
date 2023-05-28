/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06C149",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        jarkata: ["Plus Jakarta Sans", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
        lekton: ["Lekton", "sans-serif"],
      },
    },
  },
  plugins: [],
};
