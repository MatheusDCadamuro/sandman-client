import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../assets/css/Navbar.module.css';
import logo from '../../assets/images/Logo.png';


function Navbar() {
    return (
        <div className={style.navbar}>
            <div>
                <Link to="/">
                    <img src={logo} alt="logo" height="100px" />
                </Link>

            </div>
            <div className={style.list}>
                <Link className={style.item} to="/analista">Analistas</Link>
                <Link className={style.item} to="/paciente">Pacientes</Link>
                <Link className={style.item} to="/exame">Exames</Link>
            </div>
        </div>
    );
}

export default Navbar;
