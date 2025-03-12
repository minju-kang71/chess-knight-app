import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
