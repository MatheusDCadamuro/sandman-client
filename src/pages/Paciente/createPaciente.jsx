import React from 'react';
import { Toaster, toast } from "sonner";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/DadosListPaciente.css';


const isValidCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
};
  
const cnsIsValid = (cns) => {
    cns = String(cns).replace(/\D/g, '');

    if (cns.length !== 15) {
        return false;
    }

    const sum = cns.split('')
                    .map((digit, index) => parseInt(digit) * (15 - index))
                    .reduce((acc, curr) => acc + curr, 0);

    return sum % 11 === 0;
};
  
const schema = yup.object().shape({
    nome: yup.string().required('Campo obrigatório'),
    cpf: yup.string()
        .required('Campo obrigatório')
        .matches(/^\d{11}$/, 'CPF inválido')
        .test('CPF válido', 'CPF inválido', value => isValidCPF(value)),
    telefone: yup.string()
        .required('Campo obrigatório')
        .matches(/^\d{11}$/, 'Telefone inválido'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    cns: yup.string()
        .required('Campo obrigatório')
        .matches(/^\d{15}$/, 'CNS inválido')
        .test('CNS válido', 'CNS inválido', value => cnsIsValid(value)),
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
                    'x-access-token': localStorage.getItem('x-access-token'),
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Paciente cadastrado com sucesso:', result);
                toast.success("Paciente cadastrado com sucesso!");
            } else {
                console.error('Erro ao cadastrar paciente');
                toast.error("Erro ao cadastrar paciente");
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
                                    
                    <span className='error'>{errors?.cpf?.message}</span>
                    <input
                        id="demo-cpf"
                        type="text"
                        pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                        placeholder="CPF"
                        className="input-field3"
                        {...register('cpf')}
                    />
                    <span className='error'>{errors?.telefone?.message}</span>
                    <input
                        id="demo-telefone"
                        type="text"
                        data-mask="(00) 00000-0000" data-mask-selectonfocus="true"
                        placeholder="Telefone"
                        className="input-field3"
                        {...register('telefone')}
                    />
                    <span className='error'>{errors?.email?.message}</span>
                    <input
                        type="email"
                        id="demo-email"
                        placeholder="E-mail"
                        className="input-field3"
                        {...register('email')}
                    />
                    <span className='error'>{errors?.cns?.message}</span>
                    <input
                        type="text"
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
