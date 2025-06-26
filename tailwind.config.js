// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
//     // Or if using `src` directory:
//     "./src/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",  // Use the CSS variable for primary color
        secondary: "var(--secondary)",  // Use the CSS variable for secondary color
        tertiary: "var(--ternary)",  // Use the CSS variable for ternary color
        lightprimery: "var(--lightprimery)",
        lightsecondary:"var(--lightsecondary)",
        darktext: "var(--darktext)",
        whitetext: "var(--whitetext)",
        lightext: "var(--lightext)",
        HeadingText:"var(--HeadingText)",
      },

      screens: {
        'xs': {'min': '320px', 'max': '375px'}, // Custom breakpoint for 320px to 375px
        
      },
    },
  },
  plugins: [],
};
