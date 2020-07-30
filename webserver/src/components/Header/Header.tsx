import React from 'react';
import logo from '../../assets/logo1.png';

import './Header.css';

const Header = () => {
    return (
        <header className="background-color shadow-sm py-2 container-fluid">
            <img className="rounded" style={{width: '10vw'}} src={logo} alt="Logo Header"/>
        </header>
    )
}

export default Header;