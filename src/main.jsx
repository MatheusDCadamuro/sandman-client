import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./pages/root";
import ErrorPage from "./pages/errorPage";
import Analista from "./pages/Analista/analista";
import CreateAnalista from "./pages/Analista/createAnalista";
import AtualizarAnalista from "./pages/Analista/updateAnalista";
import ExcluirAnalista from "./pages/Analista/deleteAnalista";
import ModificarAnalista from "./pages/Analista/teste";
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
  {
    path: "analista/atualizar",
    element: <AtualizarAnalista />,
  },
  {
    path: "analista/deletar",
    element: <ExcluirAnalista />,
  },
  {
    path: "analista/teste",
    element: <ModificarAnalista />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);