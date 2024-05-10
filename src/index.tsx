import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
} else {
  console.error("Root element not found.");
}
