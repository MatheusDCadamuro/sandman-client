import React, { useState } from 'react';
import '../../assets/css/DadosListAnalista.css';

export default function ExcluirAnalista() {
  const [id, setId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/agente/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Analista excluído com sucesso');
      } else {
        console.error('Erro ao excluir analista');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <div id="wrapper" className="content-center">
      <footer id="footer">
        <div className="inner">
          <h2>Excluir Analista</h2>
          <form onSubmit={handleSubmit} className="excluir-analista-form">
            <h4>O CDEnf digitado será excluído, o login será apagado e a pessoa não terá mais acesso.</h4>
            
            <input
              type="text"
              placeholder="CDEnf do Analista"
              value={id}
              onChange={(e) => setId(e.target.value)}
              maxLength={10}
            />
            
            <ul className="actions">
              <li>
                <input
                  type="submit"
                  value="Excluir"
                  className="primary button"
                />
              </li>
            </ul>
          </form>
        </div>  
      </footer>
    </div>
  );
}