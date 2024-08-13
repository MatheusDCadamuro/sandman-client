import React, { useState } from 'react';
import '../../assets/css/deleteAnalista.css';

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
    <div className="excluir-analista-container">
      <h2>Excluir Analista</h2>
      <form onSubmit={handleSubmit} className="excluir-analista-form">
        <div style={{ marginBottom: '10px', fontSize: '0.9rem', textAlign: 'center' }}>
          <h3>O CDEnf digitado será excluído, o login será apagado e a pessoa não terá mais acesso.</h3>
        </div>
        <div>
          <input
            type="text"
            placeholder="CDEnf do Analista"
            value={id}
            onChange={(e) => setId(e.target.value)}
            maxLength={10}
          />
          <button type="submit">Excluir</button>
        </div>
      </form>
    </div>
  );
}