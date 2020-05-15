import React from "react";
import ReactDOM from "react-dom";
import "minireset.css";
import App from "./App";
import { AppStateProvider } from "./providers/appState";
require("typeface-ibm-plex-sans");

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
