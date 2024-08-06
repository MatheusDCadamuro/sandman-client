import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Root from "./pages/root/root";
import ErrorPage from "./pages/root/errorPage";
import Login from './pages/root/login';

import Analista from "./pages/Analista/analista";
import CreateAnalista from "./pages/Analista/createAnalista";
import AtualizarAnalista from "./pages/Analista/updateAnalista";
import ExcluirAnalista from "./pages/Analista/deleteAnalista";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/analista" element={<Analista />} />
      <Route path="/analista/cadastrar" element={<CreateAnalista />} />
      <Route path="/analista/atualizar" element={<AtualizarAnalista />} />
      <Route path="/analista/deletar" element={<ExcluirAnalista />} />
    </Routes>
  )
}

export default App
