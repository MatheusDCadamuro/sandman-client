import React from 'react';
import { Toaster, toast } from "sonner";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/createAnalista.css';


//Biblioteca de validação de formulários
const schema = yup.object().shape({
  cdenf: yup.string().required('Campo obrigatório'),
  nome: yup.string().required('Campo obrigatório'),
  telefone: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  senha: yup.string().required('Campo obrigatório').min(8, 'Mínimo de 8 caracteres'),
  confSenha: yup.string().oneOf([yup.ref('senha'), null], 'Senhas não conferem'),
  administrador: yup.boolean(),
});

export default function CreateAnalista() {

  const { register, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const handleSubmit = async (data) => {
    console.log('data:', data);
    try {
      const response = await fetch('http://localhost:3000/agente/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yjk0ZmUwMDZhZjFhODZlOGM4YmNlOCIsImlhdCI6MTcyMzQyMDY4MiwiZXhwIjoxNzIzNTA3MDgyfQ.6aTPRfwNV234H2t56eK-bQJnBXqA_X6EyE643QPHmEg",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Analista criado com sucesso:', result);
        toast.success("Analista criado com sucesso!");
      } else {
        console.error('Erro ao criar analista');
        toast.error("Erro ao criar analista");
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
            <h2>Dados Analista</h2>
            <Toaster richColors />
            <form method="post" onSubmit={onSubmit(handleSubmit)}>
              <div className="row gtr-uniform">
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
                <div className="col-12">
                  <input
                    id="demo-Nome"
                    type="text"
                    placeholder="Nome"
                    rows="6"
                    className="input-field"
                    {...register('nome')}
                  ></input>
                  <span className='error'>{errors?.nome?.message}</span>
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="number"
                    id="demo-telefone"
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
                <div className="col-6 col-12-xsmall">
                  <input
                    type="password"
                    id="demo-confSenha"
                    placeholder="Confirme a senha"
                    className="input-field"
                    {...register('confSenha')}
                  />
                  <span className='error'>{errors?.confSenha?.message}</span>
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
                        value="Cadastrar"
                        className="primary button"

                      />
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </section>
        </div>
      </footer>
    </div>
  );
}
