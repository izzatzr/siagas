/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-guest": "url('./src/assets/images/side-image.png')",
      },
    },
  },
  plugins: [],
};
