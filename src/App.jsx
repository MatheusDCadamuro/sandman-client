import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Root from "./pages/root/root";
import ErrorPage from "./pages/root/errorPage";
import Login from './pages/root/Login';
import Paciente from './pages/Paciente/pacnete';
import Analista from "./pages/Analista/analista";
import CreateAnalista from "./pages/Analista/createAnalista";
import AtualizarAnalista from "./pages/Analista/updateAnalista";
import ExcluirAnalista from "./pages/Analista/deleteAnalista";
import Exame from './pages/Exame/exame';
import CreateExame from './pages/Exame/createExame';
import CreatePaciente from './pages/Paciente/createPaciente';
import Laudo from './pages/Laudo/laudo';
import GerarLaudo from './pages/Laudo/gerarLaudo';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('x-access-token');

  if (!token) {
    // Se não houver token, redirecione para a página de login
    return <Navigate to="/login" replace />;
  }
  // Se o token existir, renderize a rota
  return children;
};

function App() {

  return (
    <Routes>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<Login />} />

      <Route path="/analista" element={<ProtectedRoute><Analista /></ProtectedRoute>} />
      <Route path="/paciente" element={<ProtectedRoute><Paciente /></ProtectedRoute>} />
      <Route path="/analista/cadastrar" element={<ProtectedRoute><CreateAnalista /></ProtectedRoute>} />
      <Route path="/analista/atualizar" element={<ProtectedRoute><AtualizarAnalista /></ProtectedRoute>} />
      <Route path="/analista/deletar" element={<ProtectedRoute><ExcluirAnalista /></ProtectedRoute>} />
      <Route path="/exame" element={<ProtectedRoute><Exame /></ProtectedRoute>} />
      <Route path="/exame/cadastrar" element={<ProtectedRoute><CreateExame /></ProtectedRoute>} />
      <Route path="/exame/cadastrar/paciente" element={<ProtectedRoute><CreatePaciente /></ProtectedRoute>} />
      <Route path="/exame/laudo" element={<ProtectedRoute><Laudo /></ProtectedRoute>} />
      <Route path="/exame/laudo/gerar" element={<ProtectedRoute><GerarLaudo/></ProtectedRoute>} />
    </Routes>
  )
}

export default App
