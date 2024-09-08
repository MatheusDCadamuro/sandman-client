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

const ExameTable = ({ exames = [], onCheckboxChange, selectedExame }) => {
  return (
    <table className="analista-table">
      <thead>
        <tr>
          <th></th>
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
                  checked={selectedExame === exame.eeg}
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
  const [selectedExame, setSelectedExame] = useState(null); // Permitir apenas um exame selecionado
  const navigate = useNavigate();

  const onCheckboxChange = (exameId) => {
    setSelectedExame(exameId); // Apenas um exame pode ser selecionado
  };

  const onSubmitForm = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/exame/buscar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('x-access-token'),                    
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
    if (!selectedExame) {
      toast.error("Selecione um exame para visualizar");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/exame/read/${selectedExame}`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('x-access-token'),       
        },
      }).then((response) => response.json());

      if (response.ok) {
        navigate("/exame/laudo/gerar", { state: { data: response } });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
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
            <h2>Paciente</h2>
            <input
              id="demo-cpf-CDEnd"
              type="number"
              placeholder="CPF"
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
              <h2>Exames</h2>
              <ExameTable 
                exames={exames} 
                onCheckboxChange={onCheckboxChange} 
                selectedExame={selectedExame} 
              />
            </div>

            <ul className="actions-4">
              <li>
                <button
                  type="button"
                  onClick={handleViewLaudo}
                  className="primary button-4"
                >
                  Ver Exame
                </button>
              </li>
            </ul>
          </div>
        </form>
      </footer>
    </div>
  );
}
