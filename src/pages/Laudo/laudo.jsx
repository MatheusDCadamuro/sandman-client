import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/DadosListLaudo.css';

const schema = yup.object().shape({
  id: yup.string().required('Campo obrigatório'),
});

export default function Laudo() {
  const { register, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

const buscarLaudo = async () => {
    try {
        const response = await fetch('http://localhost:3000/exame/laudo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yjk0ZmUwMDZhZjFhODZlOGM4YmNlOCIsImlhdCI6MTcyMzQyMDY4MiwiZXhwIjoxNzIzNTA3MDgyfQ.6aTPRfwNV234H2t56eK-bQJnBXqA_X6EyE643QPHmEg",
            },
        }).then((response) => response.json());
        console.log('response:', response);
    } catch (error) {
        console.error('Erro ao buscar laudo:', error);
    }
}
  return (
    <div id="wrapper-4" className="content-center">
      <footer id="footer-4">
        <div className="inner-4">
          <h2>Laudo</h2>

          <input
            id="demo-cpf-CDEnd"
            type="number"
            placeholder="CPF / CDEnf"
            className="input-field-4"
            {...register('id')}
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
          

          {/* Campo para lista de exames */}
          <select className="input-field-4">
            <option value="">Selecione um exame</option>
          </select>
          
          <ul className="actions-4">
            <li>
                <input
                    type="submit"
                    value="Ver Laudo"
                    className="primary button-4"
                />
            </li>
           </ul>
          
        </div>
      </footer>
    </div>
  );
}
