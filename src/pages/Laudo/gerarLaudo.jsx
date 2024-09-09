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
  const [stage_table, setstage_table] = useState(null);
  const { register, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });


  useEffect(() => {
    if (!data) {
      console.error('Nenhum exame foi selecionado');
    } else {
      console.log('Exames selecionados:', data);
      seteeg_reading_plot(data.laudo.eeg_reading_plot);
      setclassified_eeg_reading_plot(data.laudo.classified_eeg_reading_plot);
      setsleep_stages_distribution_plot(data.laudo.sleep_stages_distribution_plot);
      setstage_table(data.laudo.stage_table);
    }
  }, [data]);

  const handleSubmit = async (info) => {
    try {
      console.log('data:', info);
      const enviarPdf = {
        pdf: {
          CDEnf: data.pdf.CDEnf,
          name: data.pdf.name,
          job_id: data.pdf.job_id,
          technician: data.pdf.technician,
          notes: info.notes,
        },
        email: data.email,
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
          <div className='fotos'>
            <img
              src={`data:image/png;base64,${eeg_reading_plot}`}
              alt="Laudo"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <img
              src={`data:image/png;base64,${classified_eeg_reading_plot}`}
              alt="Laudo"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <img
              src={`data:image/png;base64,${sleep_stages_distribution_plot}`}
              alt="Laudo"
              style={{ maxWidth: '100%', height: 'auto' }}
            />

            {stage_table && (
              <div>
                <h3>Tabela dos Estágios do Sono</h3>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Acordado</th>
                      <th>N1</th>
                      <th>N2</th>
                      <th>N3</th>
                      <th>REM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stage_table.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <th>
                          {['Acordado', 'N1', 'N2', 'N3', 'REM'][rowIndex]}
                        </th>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}


          </div>
          <Toaster richColors />
          <form method="post" onSubmit={onSubmit(handleSubmit)}>
            <div className='notes'>
              <label htmlFor="notes">Laudo do Analista: </label>
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
                  value="Finalizar"
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