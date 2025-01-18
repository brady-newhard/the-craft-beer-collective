/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs,html}",  // All EJS templates in the views directory
    "./public/**/*.{html,js}", // Static files (HTML, JS) in the public directory
  ],
  theme: {
    extend: {}, // Add customizations here if needed
  },
  plugins: [],
};


