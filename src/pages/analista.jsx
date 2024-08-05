import React from 'react';
import { Link } from 'react-router-dom';

export default function Analista() {
  return (
    <div>
      <h1>Gerenciamento de Analista</h1>
      <div>
        <Link to="cadastrar">
          <button>Cadastrar Analista</button>
        </Link>
        <Link to="/atualizar">
          <button>Atualizar Analista</button>
        </Link>
        <Link to="/excluir">
          <button>Excluir Analista</button>
        </Link>
      </div>
    </div>
  );
}