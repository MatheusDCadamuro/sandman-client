import React from 'react';
import { Link } from 'react-router-dom';
import nav from './Navbar.module.css';

function Footer() {
    return (
        <div className={nav.footer}>
            <div className={nav.item}>
                Footer
            </div>
        </div>
    );
}

export default Footer;
