import React, { useState } from 'react';

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
    <div>
      <h2>Excluir Analista</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="CDEnf do Analista"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Excluir</button>
        </div>
      </form>
    </div>
  );
}
