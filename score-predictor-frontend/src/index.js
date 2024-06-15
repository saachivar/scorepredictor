import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Home from "./Home"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "./App.css"
import Survey from "./Survey";
import Results from "./Results";

const router = createBrowserRouter([
  {
    path: "/Home",
    element: <Home />
  },
  {
    path: "/Survey",
    element: <Survey />,
  },
  {
    path: "/Results",
    element: <Results />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);