import React from 'react';
import logo from '../../assets/logo1.png';

import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="background-color shadow-sm py-2 container-fluid">
            <Link to="/">
                <img className="rounded" style={{width: '10vw', minWidth: '75px'}} src={logo} alt="Logo Header"/>
            </Link>
        </header>
    )
}

export default Header;