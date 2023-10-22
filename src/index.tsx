import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductProvider } from "./Context/Product";
import { AuthProvider } from "./Context/Auth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
  </AuthProvider>
);
