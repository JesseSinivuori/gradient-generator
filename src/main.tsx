import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster
        toastOptions={{
          duration: 1000,
          className: "bg-black/50 backdrop-blur-xl text-white"
        }}
      />
    <App />
  </React.StrictMode>
);
