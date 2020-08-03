import React from 'react';
import { Link } from 'react-router-dom';
import {RiLoginBoxLine} from 'react-icons/ri';
import {IoIosCreate} from 'react-icons/io';

import Header from '../Header/Header';

import './Root.css';

const Root = () => {
    return (
        <>
        <Header/>
        <div className="m-5 p-3 row">
            <div className="card text-center shadow zoom-hover col-sm-5 mx-auto py-2">
                <Link className="text-decoration-none" to="/login">
                    <RiLoginBoxLine className="mt-3 mb-3 ml-auto mr-auto" size={40} />
                    <p className="h6 text-secondary">
                        <strong>CONECTAR</strong>
                    </p>
                </Link>
            </div>
            <div className="card text-center shadow zoom-hover col-sm-5 mx-auto py-2">
                <Link className="text-decoration-none" to="/signup">
                    <IoIosCreate className="mt-3 mb-3 ml-auto mr-auto" size={40} />
                    <p className="h6 text-secondary">
                        <strong>CADASTRAR</strong>
                    </p>
                </Link>
            </div>
        </div>
        </>
    )
}

export default Root;