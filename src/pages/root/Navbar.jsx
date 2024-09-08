import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../../assets/css/Navbar.module.css';
import logo from '../../assets/images/Logo.png';
import styleButton from '../../assets/css/NavbarButton.module.css';

function Navbar() {
    const navigate = useNavigate();

    // Função para verificar se o usuário tem o novo token admin
    const hasAdminToken = () => {
        const adminToken = localStorage.getItem('admin-token');
        return adminToken === '"admin"'; // Substitua pelo valor real do token admin
    };

    const handleLogout = () => {
        localStorage.removeItem('x-access-token'); // Remove o token de autenticação
        localStorage.removeItem('admin-token'); // Remove o novo token admin
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <div className={style.navbar}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/">
                    <img src={logo} alt="logo" height="100px" />
                </Link>
                <span style={{ marginLeft: '10px', fontSize: '2rem', color: 'white' }}>Sandman</span>
            </div>

            <div className={style.list}>
                {hasAdminToken() && (
                    <>
                        <Link className={style.item} to="analista">Analistas</Link>
                        <Link className={style.item} to="paciente">Pacientes</Link>
                    </>
                )}
                <div className={styleButton.profileMenu}>
                    <button onClick={handleLogout} className={styleButton.profileButton}>Off</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
