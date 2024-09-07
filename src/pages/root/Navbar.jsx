import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../../assets/css/Navbar.module.css';
import logo from '../../assets/images/Logo.png';
import styleButton from '../../assets/css/NavbarButton.module.css';


function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('x-access-token'); // Remove o token de autenticação
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
                <Link className={style.item} to="analista">Analistas</Link>
                <Link className={style.item} to="exame">Exames</Link>
            <div className={styleButton.profileMenu}>
            <button onClick={handleLogout} className={styleButton.profileButton}>Off</button>
            </div>

            </div>

            
        </div>
    );
}

export default Navbar;
