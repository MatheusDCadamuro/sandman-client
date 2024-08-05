import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./pages/root";
import ErrorPage from "./pages/errorPage";
import CreateAnalista from "./pages/createAnalista";
import Analista from "./pages/analista";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,    
  },
  {
    path: "analista",
    element: <Analista />,
  },
  {
    path: "analista/cadastrar",
    element: <CreateAnalista />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);