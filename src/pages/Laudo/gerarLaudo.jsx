import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/DadosListLaudo.css';

const schema = yup.object().shape({
  notes: yup.string().required('Campo obrigatório'),
});

export default function GerarLaudo() {
  const location = useLocation();
  const { data } = location.state || {};
  const [eeg_reading_plot, seteeg_reading_plot] = useState(null);
  const [classified_eeg_reading_plot, setclassified_eeg_reading_plot] = useState(null);
  const [sleep_stages_distribution_plot, setsleep_stages_distribution_plot] = useState(null);
  const { register, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });


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

  const handleSubmit = async (info) => {
    try {
      console.log('data:', info);
     const  enviarPdf = {
        CDEnf: data.pdf.CDEnf,
        name: data.pdf.name,
        job_id: data.pdf.job_id,
        technician: data.pdf.technician,
        notes: info.notes,
      }
      console.log('enviarPdf:', enviarPdf);
      const response = await fetch('http://localhost:3000/exame/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('x-access-token'),          
        },
        body: JSON.stringify(enviarPdf),
      }).then((response) => response.json());

      if (response.ok) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }

    } catch (error) {
      toast.error("Erro ao enviar dados");
      console.error('Erro ao enviar dados:', error);
    }
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
          <form method="post" onSubmit={onSubmit(handleSubmit)}>
            <div>
              <label htmlFor="notes">notes</label>
              <input
                type="text"
                id="notes"
                {...register('notes')}
              />
              {errors.notes && <p>{errors.notes.message}</p>}
            </div>

            <ul className="actions2">
              <li>
                <input
                  type="submit"
                  value="Examinar"
                  className="primary button2"
                />
              </li>
            </ul>
          </form>
        </div>
      ) : (
        <p>Nenhuma imagem encontrada</p>
      )}
    </div>
  );
}