import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Header from '../Header/Header';

import logo from '../../assets/logo.png';
import { Auth } from 'aws-amplify';

const SignUp = () => {

    const [getSigneUp, setSigneUp] = useState<Boolean>(false);
    const [getConfirmed, setConfirmed] = useState<Boolean>(false);
    const [getSubmittingSignUp, setSubmittingSignUp] = useState<Boolean>(false);
    const [getSubmittingConfirmation, setSubmittingConfirmation] = useState<boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [getConfirmationCode, setConfirmationCode] = useState<string>('');

    const history = useHistory();

    async function handleSubmitSingUp(event: FormEvent){
        event.preventDefault();
        if(!getConfirmed && !getSigneUp){
            setSubmittingSignUp(true);

            console.log(username)
            console.log(password)
            console.log(email)
            console.log(phoneNumber)

            await Auth.signUp({username, password, attributes:{email, phone_number: phoneNumber}})
            .then(() => {setSigneUp(true); setSubmittingSignUp(false)})
            .catch(err => {
                setSubmittingSignUp(false);
                console.log(err);
            });
        }
        // history.push('/login');
    }

    async function handleSubmitConfirmationSignUp(event: FormEvent){
        event.preventDefault();
        console.log(username)
        console.log(getConfirmationCode)
        if(!getConfirmed && getSigneUp){
            setSubmittingConfirmation(true);
            await Auth.confirmSignUp(username, getConfirmationCode)
            .then(() => {setSubmittingConfirmation(false); setConfirmed(true);})
            .catch(err => {
                console.log(err);
                setSubmittingConfirmation(false);
            })
        }

    }
    
    return (
        <>
            <Header/>

            <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded">
                <div className="row justify-content-md-center mt-5 mb-5"><img src={logo} style={{width:'24%', height: '24%'}} alt="logo"/></div>
                <div className="row justify-content-md-center mt-2">
                    {getConfirmed &&
                        <></>
                    }
                    {getSigneUp && 
                        <form onSubmit={handleSubmitConfirmationSignUp}>
                            <div className="form-group">
                                <label htmlFor="usernameConfirmationInput">Username</label>
                                <input className="form-control" type="text" name="username" id="usernameConfirmationInput" onChange={(e) => setUsername((e.target as HTMLInputElement).value)} placeholder="Digite seu usuário" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="codeConfirmationInput">Código de confirmação</label>
                                <input className="form-control" type="text" name="confirmationCode" id="codeConfirmationInput" onChange={(e) => setConfirmationCode((e.target as HTMLInputElement).value)} placeholder="Digite o código de confirmação"/>
                            </div>
                            <button disabled={getSubmittingConfirmation} type="submit" className="btn btn-success">Confirmar</button>
                        </form>
                    }
                    {!getSigneUp && 
                        <form className="text-center" onSubmit={handleSubmitSingUp}>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="usuario">Usuário</label>
                                <input type="text" className="form-control" id="usuario" onChange={(e) => setUsername((e.target as HTMLInputElement).value)} placeholder="Digite um usuário"/>
                            </div>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="email">E-mail</label>
                                <input type="email" className="form-control" id="email" onChange={(e) => setEmail((e.target as HTMLInputElement).value)} placeholder="Digite seu melhor e-mail"/>
                            </div>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="nome">Telefone</label>
                                <input type="text" className="form-control" id="nome" onChange={(e) => setPhoneNumber((e.target as HTMLInputElement).value)} placeholder="Digite seu nome"/>
                            </div>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="senha">Senha</label>
                                <input type="password" className="form-control" id="senha" onChange={(e) => setPassword((e.target as HTMLInputElement).value)} placeholder="Digite sua senha"/>
                            </div>
                            <button type="submit" className="btn btn-success" >Cadastrar</button>
                            <p className="mt-1"><Link to="/login">Ja possui uma conta? Conecte-se</Link></p>
                        </form>
                    }
                </div>
            </div>
        </>
    )
}

export default SignUp;