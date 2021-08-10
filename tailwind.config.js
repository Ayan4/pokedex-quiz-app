module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: "'Poppins', sans-serif"
    },
    boxShadow: {
      box: "0px 2px 7px rgba(0, 0, 0, 0.13)",
      boxStrong: "0px 2px 7px rgba(0, 0, 0, 0.20)"
    },
    extend: {}
  },
  variants: {
    extend: {
      display: ["group-hover"]
    }
  },
  plugins: []
};
