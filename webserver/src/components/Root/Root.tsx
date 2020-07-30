import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {RiLoginBoxLine} from 'react-icons/ri';
import {IoIosCreate} from 'react-icons/io';

import Header from '../Header/Header';

import './Root.css';

const Root = () => {
    const history = useHistory();

    const [getSignUpIsActive, setSignUpIsActive] = useState<Boolean>(false);

    // useEffect(() =>{
    //     history.push('/signup');
    // }, []);
   
    return (
        <>
        <Header/>
        <div className="m-5 p-3 row">
            <Link className="text-decoration-none col-sm-6 mx-auto" to="/login">
                <div className="card text-center shadow zoom-hover">
                    <RiLoginBoxLine className="mt-3 mb-3 ml-auto mr-auto" size={40} />
                    <p className="h6 text-secondary">
                        <strong>CONECTAR</strong>
                    </p>
                </div>
            </Link>
            <Link className="text-decoration-none col-sm-6 mx-auto" to="/signup">
                <div className="card text-center shadow zoom-hover">
                    <IoIosCreate className="mt-3 mb-3 ml-auto mr-auto" size={40} />
                    <p className="h6 text-secondary">
                        <strong>CADASTRAR</strong>
                    </p>
                </div>
            </Link>
        </div>
        </>
    )
}

export default Root;