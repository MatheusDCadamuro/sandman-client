import React from 'react';
import { Toaster, toast } from "sonner";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/DadosListAnalista.css';

const schema = yup.object().shape({
  cdenf: yup.string().required('Campo obrigatório'),
  nome: yup.string().required('Campo obrigatório'),
  telefone: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  senha: yup.string().required('Campo obrigatório'),
  administrador: yup.boolean()
});

export default function AtualizarAnalista() {

  const { register, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const handleSubmit = async (data) => {
    console.log('data:', data);
    try {
      const response = await fetch(`http://localhost:3000/analista/updateFront`, {
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
          <section>
            <h2>Atualizar Analista</h2>
            <Toaster richColors />
            <form method="post" onSubmit={onSubmit(handleSubmit)}>
              <div className="col-6 col-12-xsmall">
                <input
                  id="demo-CDEnf"
                  type="number"
                  placeholder="CDEnf"
                  className="input-field"
                  {...register('cdenf')}
                />
                <span className='error'>{errors?.cdenf?.message}</span>
              </div>
              <div className="row gtr-uniform">
                <div className="col-12">
                  <input
                    name="nome"
                    id="demo-Nome"
                    placeholder="Nome"
                    rows="6"
                    className="input-field"
                    {...register('nome')}
                  ></input>
                  <span className='error'>{errors?.nome?.message}</span>
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    id="demo-telefone"
                    type="number"
                    placeholder="Telefone"
                    className="input-field"
                    {...register('telefone')}
                  />
                  <span className='error'>{errors?.telefone?.message}</span>
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="email"
                    id="demo-email"
                    placeholder="Email"
                    className="input-field"
                    {...register('email')}
                  />
                  <div className='error'>{errors?.email?.message}</div>
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="password"
                    id="demo-senha"
                    placeholder="Senha"
                    className="input-field"
                    {...register('senha')}
                  />
                  <span className='error'>{errors?.senha?.message}</span>
                </div>
                <div className="col-6 col-12-small">
                  <input
                    type="checkbox"
                    id="demo-copy"
                    {...register('administrador')}
                  />
                  <label htmlFor="demo-copy">Administrador</label>
                </div>
                <div className="col-12">
                  <ul className="actions">
                    <li>
                      <input
                        type="submit"
                        value="Atualizar"
                        className="primary button"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </section>
        </div>
      </footer >
    </div >
  );
}
