import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import '../../assets/css/MenuNavBar.css';

export default function Paciente() {
    const [pacienteData, setPacienteData] = useState([]); // Estado para armazenar os dados
    const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
    const itemsPerPage = 5; // Itens por página

    useEffect(() => {
        // Função para buscar analistas
        const fetchPacientes = async () => {
            try {
                const response = await fetch('http://localhost:3000/paciente/readAll', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('x-access-token'),
                    },
                });
                const data = await response.json();
                setPacienteData(data); // Armazena os dados no estado
            } catch (error) {
                console.error('Erro ao buscar pacientes:', error);
            }
        };

        // Chama a função de fetch assim que o componente monta
        fetchPacientes();
    }, []); // O array vazio [] garante que o efeito seja executado apenas na montagem do componente

    // Função para excluir analista pelo cdenf
    const handleDelete = async (cpf) => {
        if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
            try {
                const response = await fetch('http://localhost:3000/paciente/deleteFront', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('x-access-token'),
                    },
                    body: JSON.stringify({ cpf })
                });
                const data = await response.json();

                if (response.ok) {
                    toast.success(data.message);
                    // Atualiza a lista de analistas após excluir
                    setPacienteData(pacienteData.filter(paciente => paciente.cpf !== cpf));
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error("Erro ao enviar dados");
                console.error('Erro ao enviar dados:', error);
            }
        }
    };

    // Lógica de paginação
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pacienteData.slice(indexOfFirstItem, indexOfLastItem);

    // Funções para avançar e voltar nas páginas
    const nextPage = () => {
        if (currentPage < Math.ceil(pacienteData.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='base'>
            <div className='text'>
                <h1>Gerenciamento de Pacientes</h1>
                <h4>
                    Bem-vindo à nossa página dedicada à gestão de pacientes. Aqui, você tem o
                    controle total para adicionar ou remover novos pacientes conforme
                    necessário. Esta página foi projetada para facilitar esse processo.
                    Sinta-se à vontade para realizar as alterações necessárias e garantir
                    que sua equipe esteja sempre atualizada.
                </h4>
            </div>

            <div className='table-container'>
                <div className='list'>
                    <Link to="/exame/cadastrar/paciente">
                        <button className='button'>Cadastrar Paciente</button>
                    </Link>
                </div>

                {/* Tabela de analistas */}
                <table className='analista-table'>
                    <thead>
                        <tr>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((paciente, index) => (
                                <tr key={index}>
                                  
                                    <td>{paciente.cpf}</td>
                                    <td>{paciente.nome}</td>
                                    <td>{paciente.email}</td>
                                    <td>
                                        {/* <Link to="atualizar">
                                            <button className='button'>
                                                Atualizar
                                            </button>
                                        </Link> */}
                                        <button
                                            className='button delete-button'
                                            onClick={() => handleDelete(paciente.cpf)} // Passa o cdenf ao clicar
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Nenhum Paciente encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Botões de navegação */}
                <div className="pagination">
                    {/* <button onClick={prevPage} disabled={currentPage === 1}>
                        Voltar
                    </button>
                    <button onClick={nextPage} disabled={currentPage === Math.ceil(pacienteData.length / itemsPerPage)}>
                        Avançar
                    </button> */}
                </div>
            </div>
        </div>
    );
}
