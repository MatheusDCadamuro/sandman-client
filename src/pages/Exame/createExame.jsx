import React from 'react';
import { Link } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/DadosListExame.css';

const schema = yup.object().shape({
    cpf: yup.string().required('Campo obrigatório'),
    cdenf: yup.string().required('Campo obrigatório'),
    motivo: yup.string().required('Campo obrigatório'),
    eeg: yup.mixed()
    .required('O arquivo EEG é obrigatório')
    .test('is-json', 'O arquivo deve ser um JSON válido', (value) => {
        if (!value || !value.length) return false; // Verifica se algum arquivo foi selecionado
        const file = value[0];

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    JSON.parse(e.target.result); // Tenta fazer o parse do conteúdo do arquivo
                    resolve(true); // JSON válido
                } catch (error) {
                    resolve(false); // JSON inválido
                }
            };
            reader.onerror = () => resolve(false); // Retorna falso se ocorrer um erro na leitura do arquivo
            reader.readAsText(file); // Lê o arquivo como texto
        });
    })
});


export default function CreateExame() {

    const { register, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const handleSubmit = async (data) => {
        console.log('data:', data);
        try {
            const response = await fetch('http://localhost:3000/exame/create', {
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
        <div id="wrapper2" className="content-center2">
            <footer id="footer2">
                <div className="inner2">
                    <Toaster richColors />
                    <form method="post" onSubmit={onSubmit(handleSubmit)}>
                        <h2>Dados Exame</h2>
                        <input
                            id="demo-cpf"
                            type="number"
                            placeholder="CPF do paciente"
                            className="input-field2"
                            {...register('cpf')}
                        />
                        <span className='error'>{errors?.cpf?.message}</span>
                        <input
                            type="number"
                            id="demo-cdenf"
                            placeholder="CDEnf do análista"
                            className="input-field2"
                            {...register('cdenf')}
                        />
                        <span className='error'>{errors?.cdenf?.message}</span>
                        <input
                            type="text"
                            id="demo-motivo"
                            placeholder="Motivo do Exame"
                            className="input-field2"
                            {...register('motivo')}
                        />
                        <h5>
                            <Link className='link2' to="paciente">Cadastrar paciente</Link>
                        </h5>
                        <ul className="actions2">
                            <li>
                                <h5 className=''>Coloque o EEG do paciente abaixo</h5>
                                <input
                                    type="file"
                                    id="demo-eeg"
                                    className="input-field"
                                    accept=".json"
                                    {...register('eeg')}
                                />
                                <span className='error'>{errors?.eeg?.message}</span>
                            </li>
                        </ul>

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

            </footer>
        </div>
    );
}
