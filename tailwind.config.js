/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      colors: {
        "blue-custom": "#28507E",
      },
      fontFamily: {
        merriweather: ['"Merriweather Sans"', "sans-serif"],
      },
      backgroundImage: {
        "ocean-gradient":
          "linear-gradient(to right, #28507E, #1e3c72, #2a5298)",
        "cool-sky": "linear-gradient(to bottom, #28507E, #4B79A1, #96C3EB)",
        "pastel-4":
          "linear-gradient(135deg, #e6fff5 0%, #c3f0ff 33%, #d1c4e9 66%, #ffe0e0 100%)",
        twilight: "linear-gradient(45deg, #28507E, #3a6073, #16222a)",
        "ocean-gradient": "linear-gradient(to right, #28507E, #4CA1AF)",
        "ocean-gradient-light": "linear-gradient(to right, #6dd5ed, #2193b0)",
        "ocean-gradient-soft": "linear-gradient(to bottom, #a1c4fd, #c2e9fb)",
        "ocean-gradient-deep": "linear-gradient(to right, #002f4b, #005f6b)",
        "ocean-gradient-wave": "linear-gradient(135deg, #00c6ff, #0072ff)",
        "ocean-gradient-foam": "linear-gradient(to right, #d9f1ff, #76c7f0)",
        "ocean-gradient-sunset":
          "linear-gradient(to right, #2193b0, #6dd5ed, #bde2f5)",
        "ocean-gradient-mint": "linear-gradient(to right, #5ee7df, #b490ca)",
        "gradient-ocean": "linear-gradient(160deg, #112d4e 0%, #3f72af 100%)",
      },
    },
  },
  plugins: [],
};

