import React from "react";
import { store } from "src/redux/store";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, red, yellow } from "@mui/material/colors";

const App = ({ Component, pageProps }: AppProps) => {
  const drawerWidth = 240;

  const theme = createTheme({
    components: {
      MuiDrawer: {
        // custom componet MuiDrawer
        styleOverrides: {
          paper: {
            backgroundImage: 'url("/static/img/background_menu.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            width: drawerWidth,
          },
        },
      },
    },
    typography: {
      fontFamily: "Roboto",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
    spacing: 8,
    palette: {
      primary: process.env.NEXT_PUBLIC_IS_PRODUCTION ? blue : blue,
      background: {
        default: "#FFF",
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
