/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'bggrey' : '#1A1A1A',
        'dpurple' : '#2F0C59',
        'lpurple' : '#9667CF',
        'lgreen' : '#77AD63',
        'white' : '#FFFFFF'
      }
    },
  },
  plugins: [],
}