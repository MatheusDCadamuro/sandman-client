import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Root from "./pages/root/Root";
import ErrorPage from "./pages/root/errorPage";
import Login from './pages/root/Login';

import Analista from "./pages/Analista/analista";
import CreateAnalista from "./pages/Analista/createAnalista";
import AtualizarAnalista from "./pages/Analista/updateAnalista";
import ExcluirAnalista from "./pages/Analista/deleteAnalista";
import Exame from './pages/Exame/exame';
import CreateExame from './pages/Exame/createExame';
import CreatePaciente from './pages/Paciente/createPaciente';
import Laudo from './pages/Laudo/laudo';
import GerarLaudo from './pages/Laudo/gerarLaudo';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/analista" element={<Analista />} />
      <Route path="/analista/cadastrar" element={<CreateAnalista />} />
      <Route path="/analista/atualizar" element={<AtualizarAnalista />} />
      <Route path="/analista/deletar" element={<ExcluirAnalista />} />
      <Route path="/exame" element={<Exame />} />
      <Route path="/exame/cadastrar" element={<CreateExame />} />
      <Route path="/exame/cadastrar/paciente" element={<CreatePaciente />} />
      <Route path="/exame/laudo" element={<Laudo />} />
      <Route path="/exame/laudo/gerar" element={<GerarLaudo />} />
    </Routes>
  )
}

export default App
