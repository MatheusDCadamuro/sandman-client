import React, { useState } from 'react';
import { Toaster, toast } from "sonner";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import '../../assets/css/DadosListLaudo.css';

const schema = yup.object().shape({
  cpf: yup.string().required('Campo obrigatório'),
});

//falta limitar o checkbox para apenas um exame
const ExameTable = ({ exames = [], onCheckboxChange, selectedExames }) => {
  return (
    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Select</th>
          <th>CPF</th>
          <th>CDENF</th>
          <th>Motivo</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {exames.length > 0 ? (
          exames.map((exame) => (
            <tr key={exame._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedExames.includes(exame.eeg)}
                  onChange={() => onCheckboxChange(exame.eeg)}
                />
              </td>
              <td>{exame.cpf}</td>
              <td>{exame.cdenf}</td>
              <td>{exame.motivo}</td>
              <td>{new Date(exame.created_at).toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center' }}>Nenhum exame encontrado</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default function Laudo() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [exames, setExames] = useState([]);
  const [selectedExames, setSelectedExames] = useState([]);
  const navigate = useNavigate();

  const onCheckboxChange = (exameId) => {
    setSelectedExames((prevSelected) =>
      prevSelected.includes(exameId)
        ? prevSelected.filter((id) => id !== exameId)
        : [...prevSelected, exameId]
    );
  };

  const onSubmitForm = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/exame/buscar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yjk0ZmUwMDZhZjFhODZlOGM4YmNlOCIsImlhdCI6MTcyMzQyMDY4MiwiZXhwIjoxNzIzNTA3MDgyfQ.6aTPRfwNV234H2t56eK-bQJnBXqA_X6EyE643QPHmEg",
        },
        body: JSON.stringify(data),
      }).then((response) => response.json());

      if (response.ok) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      setExames(response.exame || []);

    } catch (error) {
      toast.error("Erro ao enviar dados");
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleViewLaudo = async () => {
    if (selectedExames.length === 0) {
      toast.error("Selecione pelo menos um exame para visualizar o laudo");
      return;
    }
    try{
      const response = await fetch(`http://localhost:3000/exame/read/${selectedExames[0]}`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json());

      if (response.ok) {
        navigate("/exame/laudo/gerar", { state: { data: response } });
      } else {
        toast.error(response.message);
      }
    }catch(error){
      toast.error("Erro ao gerar laudo");
      console.error('Erro ao gerar laudo:', error);
    }
  };

  return (
    <div id="wrapper-4" className="content-center">
      <footer id="footer-4">
        <Toaster richColors />
        <form method="post" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="inner-4">
            <h2>Laudo</h2>
            <input
              id="demo-cpf-CDEnd"
              type="number"
              placeholder="CPF / CDEnf"
              className="input-field-4"
              {...register('cpf')}
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

            <div>
              <h1>Exames</h1>
              <ExameTable 
                exames={exames} 
                onCheckboxChange={onCheckboxChange} 
                selectedExames={selectedExames} 
              />
            </div>

            <ul className="actions-4">
              <li>
                <button
                  type="button"
                  onClick={handleViewLaudo}
                  className="primary button-4"
                >
                  Ver Laudo
                </button>
              </li>
            </ul>
          </div>
        </form>
      </footer>
    </div>
  );
}
