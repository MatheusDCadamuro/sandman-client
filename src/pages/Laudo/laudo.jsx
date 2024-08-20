import React, { useState, useEffect } from 'react';
import '../../assets/css/DadosListLaudo.css';

export default function Laudo() {


{/*
  const [exames, setExames] = useState([]);

  // Exemplo de uso de useEffect para simular a recuperação de dados do banco
  useEffect(() => {
    // Simulação de chamada ao banco de dados
    const fetchExames = async () => {
      const examesSimulados = [
        { id: 1, nome: 'Exame 1' },
        { id: 2, nome: 'Exame 2' },
        { id: 3, nome: 'Exame 3' },
      ];
      setExames(examesSimulados);
    };
    fetchExames();
  }, []);
*/}

  return (
    <div id="wrapper-4" className="content-center">
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
