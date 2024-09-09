import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import '../../assets/css/MenuNavBar.css';

export default function Analista2() {
    const [analistaData, setAnalistaData] = useState([]); // Estado para armazenar os dados
    const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
    const itemsPerPage = 5; // Itens por página

    useEffect(() => {
        // Função para buscar analistas
        const fetchAnalistas = async () => {
            try {
                const response = await fetch('http://localhost:3000/analista/readAll', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('x-access-token'),
                    },
                });
                const data = await response.json();
                setAnalistaData(data); // Armazena os dados no estado
            } catch (error) {
                console.error('Erro ao buscar analistas:', error);
            }
        };

        // Chama a função de fetch assim que o componente monta
        fetchAnalistas();
    }, []); // O array vazio [] garante que o efeito seja executado apenas na montagem do componente

    // Função para excluir analista pelo cdenf
    const handleDelete = async (cdenf) => {
        if (window.confirm('Tem certeza que deseja excluir este analista?')) {
            try {
                const response = await fetch('http://localhost:3000/analista/deleteFront', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('x-access-token'),
                    },
                    body: JSON.stringify({ cdenf }), // Envia o cdenf no corpo da requisição
                });
                const data = await response.json();

                if (response.ok) {
                    toast.success(data.message);
                    // Atualiza a lista de analistas após excluir
                    setAnalistaData(analistaData.filter(analista => analista.cdenf !== cdenf));
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
    const currentItems = analistaData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(analistaData.length / itemsPerPage); // Calcula o número total de páginas

    // Funções para avançar e voltar nas páginas
    const nextPage = () => {
        if (currentPage < totalPages) {
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
                <h1>Gerenciamento de Analista</h1>
                <h4>
                    Bem-vindo à nossa página dedicada à gestão de analistas. Aqui, você tem o
                    controle total para adicionar ou remover novos analistas conforme
                    necessário. Esta página foi projetada para facilitar esse processo.
                    Sinta-se à vontade para realizar as alterações necessárias e garantir
                    que sua equipe esteja sempre atualizada.
                </h4>
            </div>

            <div className='table-container'>
                <div className='list'>
                    <Link to="cadastrar">
                        <button className='button'>Cadastrar Analista</button>
                    </Link>
                </div>

                {/* Tabela de analistas */}
                <table className='analista-table'>
                    <thead>
                        <tr>
                            <th>Admin</th>
                            <th>CDENF</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((analista, index) => (
                                <tr key={index}>
                                    <td>{analista.administrador ? "Sim" : "Não"}</td>
                                    <td>{analista.cdenf}</td>
                                    <td>{analista.nome}</td>
                                    <td>{analista.email}</td>
                                    <td>
                                        <Link to="atualizar">
                                            <button className='button'>
                                                Atualizar
                                            </button>
                                        </Link>
                                        <button
                                            className='button delete-button'
                                            onClick={() => handleDelete(analista.cdenf)} // Passa o cdenf ao clicar
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Nenhum analista encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                 <div className="botoes">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className='button'
                    >
                        Voltar
                    </button>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className='button'
                        >
                        Avançar
                    </button>
                        <span>  {currentPage} de {totalPages}</span>
                </div>
            </div>
        </div>
    );
}
