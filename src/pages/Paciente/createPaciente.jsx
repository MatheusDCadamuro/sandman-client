import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/DadosListPaciente.css';

export default function CreatePaciente() {
  return (
        <div id="wrapper3" className="content-center3">
            <footer id="footer3">
                <div className="inner3">
                    <h2>Cadastro Paciente</h2>
                    <input
                        type="text"
                        id="demo-nome"
                        placeholder="Nome Completo"
                        className="input-field3"
                    />
                    <input
                        id="demo-cpf"
                        type="number"
                        placeholder="CPF"
                        className="input-field3"
                    />
                    <input
                        id="demo-telefone"
                        type="number"
                        placeholder="Telefone"
                        className="input-field3"
                    />
                    <input
                        type="email"
                        id="demo-email"
                        placeholder="E-mail"
                        className="input-field3"
                    />
                    <input
                        type="number"
                        id="demo-cns"
                        placeholder="CNS"
                        className="input-field3"
                    />
                    <input
                        type="text"
                        id="demo-comorbidades"
                        placeholder="Comorbidades"
                        className="input-field3"
                    />
                    <ul className="actions3">
                        <li>
                            <input
                                type="submit"
                                value="Salvar"
                                className="primary button3"
                            />
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
