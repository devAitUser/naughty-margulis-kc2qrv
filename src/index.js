// src/index.js
import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";

import { KeycloakProvider } from "./providers/KeycloakProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <KeycloakProvider>
      <App />
    </KeycloakProvider>
  </React.StrictMode>
);
