import React, { useState } from 'react';
import { Toaster, toast } from "sonner";

export default function CreateAnalista() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cdenf: '',
    telefone: '',
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
    if (e.target.value === "Cadastrar") {
      try {
        const response = await fetch('http://localhost:3000/agente/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Analista criado com sucesso:', result);
          toast.success("Analista criado com sucesso!");
        } else {
          console.error('Erro ao criar analista');
          toast.error("Erro ao criar analista");
        }
      } catch (error) {
        toast.error("Erro ao enviar dados");
        console.error('Erro ao enviar dados:', error);
      }
    }
  };

  return (
    <div id="wrapper" className="content-center">
      <footer id="footer">
        <div className="inner">
          <section>
            <h2>Dados Analista</h2>
            <Toaster richColors/>
            <form method="post" onSubmit={handleSubmit}>
              <div className="row gtr-uniform">
                <div className="col-12">
                  <textarea
                    name="nome"
                    id="demo-Nome"
                    placeholder="Nome"
                    rows="6"
                    value={formData.nome}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="email"
                    name="email"
                    id="demo-email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="password"
                    name="senha"
                    id="demo-senha"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="text"
                    name="cdenf"
                    id="demo-CDEnf"
                    placeholder="CDEnf"
                    value={formData.cdenf}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="number"
                    name="telefone"
                    id="demo-telefone"
                    placeholder="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 col-12-small">
                  <input
                    type="checkbox"
                    id="demo-copy"
                    name="administrador"
                    checked={formData.administrador}
                    onChange={handleChange}
                  />
                  <label htmlFor="demo-copy">Administrador</label>
                </div>
                <div className="col-12">
                  <ul className="actions">
                    <li>
                      <input
                        type="submit"
                        value="Cadastrar"
                        className="primary"
                        onClick={handleSubmit}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </section>
        </div>
      </footer>
    </div>
  );
}
