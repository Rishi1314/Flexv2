/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "WebDeveloper":"#00A9FF",
        "Creator":"#FD8D14"
      }
    },
  },
  plugins: [],
}