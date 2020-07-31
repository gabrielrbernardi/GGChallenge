import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Toast from 'react-bootstrap/Toast';

import Header from '../Header/Header';
import SignUpService from './SignUpService';

import logo from '../../assets/logo.png';

const SignUp = () => {
    const history = useHistory();

    const [getSigneUp, setSigneUp] = useState<Boolean>(false);
    const [getConfirmed, setConfirmed] = useState<Boolean>(false);
    const [, setSubmittingSignUp] = useState<Boolean>(false);
    const [getSubmittingConfirmation, setSubmittingConfirmation] = useState<boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [getConfirmationCode, setConfirmationCode] = useState<string>('');

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const toggleShowToast = () => setShowToast(!showToast);

    const signupService = new SignUpService();

    async function handleSubmitSingUp(event: FormEvent){
        event.preventDefault();
        if(!getConfirmed && !getSigneUp){
            setSubmittingSignUp(true);

            await signupService.singupFunction(username, password, email, phoneNumber)
            .then(response => {
                console.log(response);
                if(response){
                    if(!response.signedUpUser){
                        setSubmittingSignUp(false);
                        setShowToast(true);
                        console.log(response.error)
                        setToastMessage(response.error);
                    }else{
                        setSigneUp(true);
                        setSubmittingSignUp(false);
                    }
                }else{
                    setShowToast(true);
                    setToastMessage('Aguardando resposta');
                }
            }).catch((err) => {
                if(err.message.code === 'UsernameExistsException'){
                    setShowToast(true);
                    setToastMessage('Usuário já existente.');
                }
            })
        }
    }

    async function handleSubmitConfirmationSignUp(event: FormEvent){
        event.preventDefault();
        if(!getConfirmed && getSigneUp){
            await signupService.handleSubmitConfirmationSignUp(username, getConfirmationCode)
            .then(response => {
                if(response){
                    if(!response.confirmationSignUp){
                        setSubmittingConfirmation(false);
                        setShowToast(true);
                        setToastMessage(response.error);
                    }else{
                        setSubmittingConfirmation(false);
                        setConfirmed(true);
                        history.push('/login');
                    }
                }else{
                    setShowToast(true);
                    setToastMessage('Aguardando resposta');
                }
            }).catch((err) => {
                if(err.message.code === 'UsernameExistsException'){
                    setShowToast(true);
                    setToastMessage('Usuário já existente.');
                }
            })
        }
    }
    
    return (
        <>
            <Header/>
            <Toast show={showToast} onClose={toggleShowToast} delay={5000} autohide style={{position: 'fixed', bottom: 0, right: 0}}>
                <Toast.Header className="bg-danger text-light" >
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Erro!</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
            <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded">
                <div className="row justify-content-md-center mt-5 mb-5"><img src={logo} style={{width:'24%', height: '24%'}} alt="logo"/></div>
                <div className="row justify-content-md-center mt-2 mb-5">
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
                        <form  onSubmit={handleSubmitSingUp}>
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