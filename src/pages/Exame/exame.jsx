import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/MenuNavBar.css';

export default function Exame() {
  return(
    <div className='base'>
      <div className='text'>
        <h1>
          Exames
        </h1>

        <h4>      
          Bem-vindo à nossa página dedicada à gestão de exames e laudos. 
          Aqui, você tem o controle total para adicionar novos exame ou criar 
          e editar laudos. Esta página foi projetada para facilitar esse processo. 
          Sinta-se à vontade para realizar as alterações necessárias e 
          garantir que sua equipe esteja sempre atualizada.
        </h4>
      </div>
      
      <div className='list'>
        <Link to="cadastrar">
          <button className='button'>
            Cadastrar Exame
          </button>
        </Link>

        <Link to="laudo">
          <button className='button'>
            Laudos
          </button>
        </Link>
      </div>
    </div>
  );
}
