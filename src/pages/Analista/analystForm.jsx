import React from 'react';
import '../../assets/css/analystForm.css'

const AnalystForm = () => {
  return (
    <div className="form-container">
      <h2>DADOS ANALISTA</h2>
      <form>
        <div className="form-group">
          <input type="text" placeholder="Nome" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="CDEnf" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirmar Senha" />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" /> Administrador
          </label>
        </div>
        <div className="form-buttons">
          <button className="btn btn-register">CADASTRAR</button>
          <button className="btn btn-edit">EDITAR</button>
          <button className="btn btn-delete">EXCLUIR</button>
        </div>
      </form>
    </div>
  );
};

export default AnalystForm;
