import React from 'react';
import { Link } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import '../../assets/css/DadosListExame.css';

const schema = yup.object().shape({
    cpf: yup.string().required('Campo obrigatório'),
    cdenf: yup.string().required('Campo obrigatório'),
    motivo: yup.string().required('Campo obrigatório'),
    eeg: yup.mixed(),
});


export default function CreateExame() {

    const { register, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [fileContent, setFileContent] = useState(null);

    const handleSubmit = async (data) => {
        try {
            const jsonData = JSON.parse(fileContent);
            data.eeg_reading = jsonData;

            const classifier = await fetch('http://127.0.0.1:5000/classifier/exam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data.eeg_reading),
            }).then((response) => response.json());

            console.log('classifier:', classifier);
            console.log('data:', data);

            if (!classifier) {
                log.error('Exame object is empty');
                res.status(500).send({ message: 'Exame object is empty' });
                return;
            }
            data.eeg = classifier.job_id;
            enviarBack(data);
            
        } catch (error) {
            toast.error("Erro ao enviar dados para o classificador.");
            console.error('Erro ao enviar dados para o classificador:', error);
        }
    };

    const enviarBack = async (data) => {
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
            toast.error("Erro ao enviar dados.");
            console.error('Erro ao enviar dados:', error);
        }
    }

    async function handleFileInput(event) {
        try {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    try {
                        const content = e.target.result;
                        setFileContent(content);
                    } catch (error) {
                        toast.error("Erro ao ler o conteúdo do arquivo.");
                        console.error("Erro ao ler o conteúdo do arquivo:", error.message);
                    }
                };

                reader.readAsText(file); // Lê o arquivo como texto
            }
        } catch (error) {
            toast.error("Erro de validação ou leitura do arquivo.");
            console.error("Erro de validação:", error.message);
        }
    }


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
                                    id="fileInput"
                                    className="input-field"
                                    accept=".json"
                                    onChange={handleFileInput}
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
