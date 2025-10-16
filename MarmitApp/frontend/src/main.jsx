// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",               // ou "dark"
    primary: {
      main: red[600],            // cor principal (botões, AppBar etc.)
      contrastText: "#fff",
    },
    secondary: {
      main: red[800],            // opcional: cor secundária
    },
  },
  components: {
    // opcional: deixar AppBar com cor "primary" por padrão
    MuiAppBar: {
      defaultProps: { color: "primary" },
    },
    // opcional: deixar Button com variante "contained" por padrão
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* reseta estilos + cuida de fundo */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
