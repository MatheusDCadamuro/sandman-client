import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./pages/root/Navbar";
import App from './App';
import Footer from "./pages/root/Footer";
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