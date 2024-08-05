import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./pages/Navbar";
import App from './App';
import Footer from "./pages/Footer";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router >
      <Navbar />
      <App />
      <Footer />
    </Router>
  </React.StrictMode>
);