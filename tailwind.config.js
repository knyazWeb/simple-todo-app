/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'touch': { 'raw': "(pointer: coarse)" },
        "no-touch": { 'raw': "(pointer: fine)" },
      },
    },
  },
  plugins: [],
};
