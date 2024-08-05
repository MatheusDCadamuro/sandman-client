import React from 'react';
import { Link } from 'react-router-dom';
import nav from './Navbar.module.css';
import logo from '../assets/images/Logo.png';

function Navbar() {
    return (
        <div className={nav.navbar}>
            <div>
                <Link to="/">
                    <img src={logo} alt="logo" height="100px" />
                </Link>

            </div>
            <div className={nav.list}>
                <Link className={nav.item} to="/analista">Analistas</Link>
                <Link className={nav.item} to="/paciente">Pacientes</Link>
                <Link className={nav.item} to="/exame">Exames</Link>
            </div>
        </div>
    );
}

export default Navbar;
