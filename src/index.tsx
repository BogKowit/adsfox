import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ApiProvider from "./context/contextFetch";
import { UIProvider } from "./context/context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApiProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </ApiProvider>
  </React.StrictMode>
);
