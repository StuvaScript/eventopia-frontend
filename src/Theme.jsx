import { createTheme } from "@mui/material/styles";
import "@fontsource/inter/400.css";

const theme = createTheme({
  palette: {
    primary: { main: "#3271D6", contrastText: "#FFFFFF" },
    secondary: { main: "#F59E0B" },
    background: { default: "#1B1D23", paper: "#23252C" },
    text: { primary: "#FFFFFF", secondary: "#B3B3B3" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: "32px", fontWeight: 400 },
    body1: { fontSize: "24px", fontWeight: 400 },
  },
});

export default theme;
