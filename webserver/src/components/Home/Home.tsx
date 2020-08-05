import React from 'react';

import logo from '../../assets/logo.png';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';


const Home = () => {
    return (
        <>
            <Header login={true}/>
            <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded">
                <div className="row justify-content-center mt-2 mb-5">
                    <p className="text-danger h2">Seja Bem-Vindo</p>
                    <div className="row justify-content-center mt-5 mb-2"><img src={logo} style={{width:'48%', height: '96%'}} alt="logo"/></div>
                </div>
            </div>
            <Dashboard/>
        </>
    )
}

export default Home;