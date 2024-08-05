import React, { useState } from 'react';

export default function AtualizarAnalista() {
  const [formData, setFormData] = useState({
    nome: '',
    cdenf: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    administrador: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/agente/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Analista atualizado com sucesso:', result);
      } else {
        console.error('Erro ao atualizar analista');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <div>
      <h2>Atualizar Analista</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            name="nome"
            placeholder="Nome"
            rows="6"
            value={formData.nome}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <input
            type="text"
            name="cdenf"
            placeholder="CDEnf"
            value={formData.cdenf}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="administrador"
            checked={formData.administrador}
            onChange={handleChange}
          />
          <label>Administrador</label>
        </div>
        <div>
          <button type="submit">Atualizar</button>
        </div>
      </form>
    </div>
  );
}
