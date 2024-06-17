import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  RouterProvider,
  useLocation
} from "react-router-dom";
import "./index.css";
import "./App.css"
import App from "./App.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);