/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        //Base Colors
        moonlightBase: "#0F1014",
        moonlightInterface: "#111216",
        moonlightOverlay: "#131317",
        moonlightSoft: "#43444D",
        moonlightSlight: "#575861",
        moonlightText: "#868690",
        moonlightFocusLow: "#121216",
        moonlightFocusMedium: "#1A1B1F",
        moonlightFocusHigh: "#1F1F24",

        //Moonlight Accents
        moonlightWhite: "#fdfdfe",
        moonlightStone: "#9898a6",
        moonlightOrange: "#ffbb88",
        moonlightPink: "#f58ee0",
        moonlightIndigo: "#c58fff",
        moonlightBlue: "#8eb6f5",

        //Monochrome Accents
        monochromeKashmir: "#626983",
        monochromeSlate: "#7C829D",
        monochromeLogan: "#999EB2",
        monochromeCadet: "#B6BAC8",
        monochromeCat: "#D3D5DE",
        monochromeCloud: "#E2E4ED",
      },
    }
  },
  plugins: []
};