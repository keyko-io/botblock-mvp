export const pressableColors = {
  iconBackground: "#000000",
  placeholderText: "#A1A1A1",
  labelBackground: "#E7E7ED",
};

type PaletteColors = "purple" | "slate" | "pink" | "yellow" | "turquoise";
export const palette: Record<PaletteColors, { 100: string; 50: string; 20: string }> = {
  // Primary palette
  purple: {
    100: "#763EFF",
    50: "#763EFF88",
    20: "#763EFF33",
  },
  slate: {
    100: "#000038",
    50: "#00003888",
    20: "#00003833",
  },
  // Secondary palette
  pink: {
    100: "#F41CA2",
    50: "#F41CA288",
    20: "#F41CA233",
  },
  yellow: {
    100: "#FFDD67",
    50: "#FFDD6788",
    20: "#FFDD6733",
  },
  turquoise: {
    100: "#34BCC9",
    50: "#34BCC988",
    20: "#34BCC933",
  },
};

export const webColors = {
  info: "#0F90FE",
  positive: "#08DD5A",
  negative: "#C71313",
};

export const coreColors = {
  black: "#000000",
  white: "#FFFFFF",
};
