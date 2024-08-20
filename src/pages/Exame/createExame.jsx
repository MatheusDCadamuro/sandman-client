import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/DadosListExame.css';

export default function CreateExame() {
  return (
        <div id="wrapper2" className="content-center2">
            <footer id="footer2">
                <div className="inner2">
                    <h2>Dados Paciente</h2>
                    <input
                        id="demo-cpf"
                        type="number"
                        placeholder="CPF"
                        className="input-field2"
                    />
                     <ul className="actions2">
                        <li>
                            <input
                                type="submit"
                                value="Pesquisar paciente"
                                className="primary button2"
                            />
                        </li>
                    </ul>

                    <ul className="actions2">
                        <li>
                            <h5>Esse paciente não existe no banco,</h5>
                            <h5>
                                <Link className='link2' to="paciente">Cadastrar paciente</Link>
                            </h5>
                        </li>
                    </ul>   

                    <h2>Dados Exame</h2>
                    <input
                        type="text"
                        id="demo-motivo"
                        placeholder="Motivo do Exame"
                        className="input-field2"
                    />
                    <input
                        type="number"
                        id="demo-cdenf"
                        placeholder="CDEnf do análista"
                        className="input-field2"
                    />
                    <ul className="actions2">
                        <li>
                            <h5 className=''>Coloque o EEG do paciente abaixo</h5>
                            <input
                                type="file"
                                id="demo-eeg"
                                className="input-field"
                                accept=".json"
                            />
                        </li>
                    </ul>
                    
                    <ul className="actions2">
                        <li>
                            <input
                                type="submit"
                                value="Cadastrar"
                                className="primary button2"
                            />
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
