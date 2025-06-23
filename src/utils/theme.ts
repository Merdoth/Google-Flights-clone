// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      paper: "#ffffff"
    },
    primary: {
      main: "#1976d2",
    },
    text: {
      primary: "#111",
      secondary: "#46494b"
    },
    divider: "#efefefe",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#202124",
      paper: "#202124",
    },
    primary: {
      main: "#90caf9",
    },
    text: {
      primary: "#f4f4f4",
      secondary: "#bdc1c5"
    },
    divider: "#606367",
  },
});
