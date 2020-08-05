import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {Auth} from 'aws-amplify';

import logo from '../../assets/logo1.png';

import './Header.css';

const Header = (props?: any) => {
    const history = useHistory();
    
    useEffect(()=>{
        Auth.currentSession()
            .then((responseUserSession) => {
                console.log('Usuario conectado');
                console.log(responseUserSession);
            })
            .catch((err) => {
                if(history.location.pathname === "/dashboard"){
                    history.push('/login');
                }
                console.log(err);
            });
    }, []);

    function handleLogout(){
        console.log('teste')
        if(props.login){
            Auth.signOut()
            .then(response => {
                history.push('/');
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <nav className="navbar px-0 justify-content-center">
        <header className="background-color shadow-sm py-2 container-fluid">
            <Link to="/">
                <img className="rounded" style={{width: '10vw', minWidth: '75px'}} src={logo} alt="Logo Header"/>
            </Link>
            {props.login && 
                <button className="btn btn-outline-danger m-0 py-0 px-2" onClick={handleLogout}>Desconectar</button>
            }
        </header>
        </nav>
    )
}

export default Header;