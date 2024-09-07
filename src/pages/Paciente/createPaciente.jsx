import React from 'react';
import { Toaster, toast } from "sonner";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/DadosListPaciente.css';

const schema = yup.object().shape({
    nome: yup.string().required('Campo obrigatório'),
    cpf: yup.string().required('Campo obrigatório'),
    telefone: yup.string().required('Campo obrigatório'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    cns: yup.string().required('Campo obrigatório'),
    comorbidades: yup.string().required('Campo obrigatório'),
});

export default function CreatePaciente() {

    const { register, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const handleSubmit = async (data) => {
        console.log('data:', data);
        try {
            const response = await fetch('http://localhost:3000/paciente/create', {
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
        <div id="wrapper3" className="content-center3">
            <footer id="footer3">
            <Toaster richColors />
            <form method="post" onSubmit={onSubmit(handleSubmit)}>
                <div className="inner3">
                    <h2>Cadastro Paciente</h2>
                    <input
                        type="text"
                        id="demo-nome"
                        placeholder="Nome Completo"
                        className="input-field3"
                        {...register('nome')}
                    />
                    <input
                        id="demo-cpf"
                        type="number"
                        placeholder="CPF"
                        className="input-field3"
                        {...register('cpf')}
                    />
                    <input
                        id="demo-telefone"
                        type="number"
                        placeholder="Telefone"
                        className="input-field3"
                        {...register('telefone')}
                    />
                    <input
                        type="email"
                        id="demo-email"
                        placeholder="E-mail"
                        className="input-field3"
                        {...register('email')}
                    />
                    <input
                        type="number"
                        id="demo-cns"
                        placeholder="CNS"
                        className="input-field3"
                        {...register('cns')}
                    />
                    <input
                        type="text"
                        id="demo-comorbidades"
                        placeholder="Comorbidades"
                        className="input-field3"
                        {...register('comorbidades')}
                    />
                    <ul className="actions3">
                        <li>
                            <input
                                type="submit"
                                value="Salvar"
                                className="primary button3"
                            />
                        </li>
                    </ul>
                </div>
            </form>
            </footer>
        </div>
    );
}
