import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/DadosListLaudo.css';

const schema = yup.object().shape({
  job_id: yup.string().required('Campo obrigatório'),
  CDEnf: yup.string().required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  technician: yup.string().required('Campo obrigatório'),
  notes: yup.string().required('Campo obrigatório'),
});

export default function GerarLaudo() {
  const location = useLocation();
  const { data } = location.state || {};
  const [eeg_reading_plot, seteeg_reading_plot] = useState(null);
  const [classified_eeg_reading_plot, setclassified_eeg_reading_plot] = useState(null);
  const [sleep_stages_distribution_plot, setsleep_stages_distribution_plot] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (!data) {
      console.error('Nenhum exame foi selecionado');
    } else {
      console.log('Exames selecionados:', data);
      seteeg_reading_plot(data.laudo.eeg_reading_plot);
      setclassified_eeg_reading_plot(data.laudo.classified_eeg_reading_plot);
      setsleep_stages_distribution_plot(data.laudo.sleep_stages_distribution_plot);

    }
  }, [data]);

  const onSubmitForm = async (data) => {
    //Vou fazer o código para enviar o laudo por email
  };

  return (
    <div>
      {eeg_reading_plot ? (
        <div>
          <h2>Resultado do Exame</h2>
          <img
            src={`data:image/png;base64,${eeg_reading_plot}`}
            alt="Laudo"
            style={{ maxWidth: '33%', height: 'auto' }}
          />
          <img
            src={`data:image/png;base64,${classified_eeg_reading_plot}`}
            alt="Laudo"
            style={{ maxWidth: '33%', height: 'auto' }}
          />
          <img
            src={`data:image/png;base64,${sleep_stages_distribution_plot}`}
            alt="Laudo"
            style={{ maxWidth: '33%', height: 'auto' }}
          />
          <Toaster richColors />
          <form method="post" onSubmit={handleSubmit(onSubmitForm)}>
            <div>
              <label htmlFor="notes">notes</label>
              <input
                type="text"
                id="notes"
                {...register('notes')}
              />
              {errors.notes && <p>{errors.notes.message}</p>}
            </div>
            
            <button type="submit">Enviar Laudo</button>
          </form>
        </div>
      ) : (
        <p>Nenhuma imagem encontrada</p>
      )}
    </div>
  );
}