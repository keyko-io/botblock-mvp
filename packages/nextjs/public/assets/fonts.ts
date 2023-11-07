import localFont from "next/font/local";

const courierPrimeFont = localFont({
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
  src: [
    {
      path: "./fonts/CourierPrime/CourierPrime-Regular.ttf",
      weight: "normal",
    },
    {
      path: "./fonts/CourierPrime/CourierPrime-Italic.ttf",
      weight: "normal",
      style: "italic",
    },
    {
      path: "./fonts/CourierPrime/CourierPrime-Bold.ttf",
      weight: "bold",
    },
    {
      path: "./fonts/CourierPrime/CourierPrime-BoldItalic.ttf",
      weight: "bold",
      style: "italic",
    },
  ],
});

const exoFont = localFont({
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
  src: [
    {
      path: "./fonts/Exo/Exo-VariableFont_wght.ttf",
      weight: "100 900",
    },
    {
      path: "./fonts/Exo/Exo-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
});

export { courierPrimeFont, exoFont };
