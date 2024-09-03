import React, { useState } from 'react';
import { Toaster, toast } from "sonner";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/DadosListAnalista.css';

const schema = yup.object().shape({
  cdenf : yup.string().required('Campo obrigatório'),
});

export default function ExcluirAnalista() {

  const { register, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });


  const handleSubmit = async (data) => {
    console.log('data:', data);
    try {
      const response = await fetch('http://localhost:3000/analista/deleteFront', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yjk0ZmUwMDZhZjFhODZlOGM4YmNlOCIsImlhdCI6MTcyMzQyMDY4MiwiZXhwIjoxNzIzNTA3MDgyfQ.6aTPRfwNV234H2t56eK-bQJnBXqA_X6EyE643QPHmEg",
        },
        body: JSON.stringify(data),
      }).then(response => response.json());

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
    <div id="wrapper" className="content-center">
      <footer id="footer">
        <div className="inner">
          <h2>Excluir Analista</h2>
          <Toaster richColors />
          <form  method="post" onSubmit={onSubmit(handleSubmit)} className="excluir-analista-form">
            <h4>O CDEnf digitado será excluído, o login será apagado e a pessoa não terá mais acesso.</h4>
            
            <input
              type="text"
              placeholder="CDEnf do Analista"
              maxLength={10}
              {...register('cdenf')}
            />
             <span className='error'>{errors?.cdenf?.message}</span>
            <ul className="actions">
              <li>
                <input
                  type="submit"
                  value="Excluir"
                  className="primary button"
                />
              </li>
            </ul>
          </form>
        </div>  
      </footer>
    </div>
  );
}