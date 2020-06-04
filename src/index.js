import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core";
import MovieState from "./context/movies/movieState";
import UserState from "./context/user/userState";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#a4a4a4",
      main: "#757575",
      dark: "#494949",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffbb93",
      main: "#ff8a65",
      dark: "#c75b39",
      contrastText: "#000",
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.StrictMode>
        <MovieState>
          <UserState>
            <App />
          </UserState>
        </MovieState>
      </React.StrictMode>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
