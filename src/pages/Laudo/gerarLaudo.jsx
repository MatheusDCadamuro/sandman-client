import React from 'react';
import '../../assets/css/DadosListLaudo.css';

export default function GerarLaudo() {
  return (
    <div id="wrapper-4" className="content-center-4">
      <footer id="footer-4">
        <div className="inner-4">
          
          <h2>Laudo</h2>

          <input
            id="demo-cpf-CDEnd"
            type="number"
            placeholder="CPF / CDEnf"
            className="input-field-4"
          />
          
          <ul className="actions-4">
            <li>
                <input
                    type="submit"
                    value="Procurar"
                    className="primary button-4"
                />
            </li>
           </ul>
          

          {/* Campo para lista de exames */}
          <select className="input-field-4">
            <option value="">Selecione um exame</option>
          </select>
          <ul className="actions-4">
            <li>
                <input
                    type="submit"
                    value="Ver Laudo"
                    className="primary button-4"
                />
            </li>
           </ul>
        </div>
      </footer>
    </div>
  );
}
