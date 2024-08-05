import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/analista.css';

export default function Analista() {
  return (
    <div className='base'>
      <div>
        <h1>Gerenciamento de Analista</h1>
        <div>Bem-vindo à nossa página dedicada à gestão de analistas. Aqui, você tem o controle total para adicionar ou remover novos analistas conforme necessário. esta página foi projetada para facilitar esse processo. Sinta-se à vontade para realizar as alterações necessárias e garantir que sua equipe esteja sempre atualizada.</div>
        <div>
          <div className='list'>
            <Link to="cadastrar">
              <button>Cadastrar Analista</button>
            </Link>
            <Link to="atualizar">
              <button>Atualizar Analista</button>
            </Link>
            <Link to="deletar">
              <button>Excluir Analista</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}