import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {Auth} from 'aws-amplify';
import Toast from 'react-bootstrap/Toast';

import logo from '../../assets/logo.png';
import VerifyCode from './VerifyCode';

const SignUp = () => {
    const history = useHistory();

    const [getSignedUp, setSignedUp] = useState<Boolean>(false);
    const [getConfirmed, setConfirmed] = useState<Boolean>(false);
    const [, setSubmittingSignUp] = useState<Boolean>(false);
    const [getSubmittingConfirmation, setSubmittingConfirmation] = useState<boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [getConfirmationCode, setConfirmationCode] = useState<string>('');

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastTitle, setToastTitle] = useState<string>('');
    const [toastClassName, setToastClassName] = useState<string>('');
    const toggleShowToast = () => setShowToast(!showToast);

    function showToastFunction(message: string, code: number){
        setShowToast(true);
        setToastMessage(message);
        if(code === 2){
            setToastTitle('Sucesso!');
            setToastClassName('bg-success text-light')
        }else{
            setToastTitle('Erro!');
            setToastClassName('bg-danger text-light');
        }
    }

    async function handleSubmitSingUp(event: FormEvent){
        event.preventDefault();
        if(!getConfirmed && !getSignedUp){
            setSubmittingSignUp(true);
            if(!username || !password || !email){
                showToastFunction("Preencha todos os campos!", 1);
                return;
            }
            await Auth.signUp({username, password, attributes:{email, name}})
                .then(response => {
                    setSubmittingSignUp(false);
                    setShowToast(true);
                    if(!response.userConfirmed){
                        showToastFunction("Código enviado! Verifique a caixa de entrada do e-mail cadastrado!", 2);
                        setSignedUp(true);
                    }
                })
                .catch(err => {
                    showToastFunction(err.code, 1);
                    if(err.code === "UsernameExistsException"){
                        showToastFunction("Usuário já existente.", 1)
                    }else if(err.code === "InvalidPasswordException"){
                        showToastFunction("A senha informada não possui os requisitos para ser criada.", 1);
                    }
                    console.log(err)
                });
        }
    }

    async function handleSubmitConfirmationSignUp(event: FormEvent){
        event.preventDefault();
        if(!getConfirmed && getSignedUp){
            await Auth.confirmSignUp(username, getConfirmationCode)
            .then((response) => {
                if(response === "SUCCESS"){
                    setShowToast(true);
                    setToastMessage("Código verificado. Você será redirecionado para fazer login no sistema.");
                    setConfirmed(true);
                    setSubmittingConfirmation(false);
                    setTimeout(() => {
                        history.push('/login');
                    }, 4000);
                }
                console.log(response);
            })
            .catch(err => {
                console.log(err);
                setSubmittingConfirmation(false);
                if(err.code === "ExpiredCodeException"){
                    setShowToast(true);
                    setToastMessage("Código inválido. Por favor, solicite um novo código.");
                }
            })
        }
    }
    
    return (
        <>
            <Toast show={showToast} onClose={toggleShowToast} delay={5000} autohide style={{position: 'fixed', bottom: 0, right: 0, zIndex: 999, maxWidth: '200px'}}>
                <Toast.Header className={toastClassName} >
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">{toastTitle}</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
            <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded">
                <div className="row justify-content-center mt-5 mb-5"><img src={logo} style={{width:'25%', height: '25%',  minWidth: '80px', minHeight: '50px'}} alt="logo"/></div>
                <div className="row justify-content-center mt-2 mb-5">
                    {getConfirmed &&
                        <></>
                    }
                    {getSignedUp && 
                        <VerifyCode child={true} registredUsername={username}/>
                        // <form onSubmit={handleSubmitConfirmationSignUp}>
                        //     <div className="form-group">
                        //         <label htmlFor="usernameConfirmationInput">Username</label>
                        //         <input className="form-control" type="text" name="username" id="usernameConfirmationInput" onChange={(e) => setUsername((e.target as HTMLInputElement).value)} placeholder="Digite seu usuário" />
                        //     </div>
                        //     <div className="form-group">
                        //         <label htmlFor="codeConfirmationInput">Código de confirmação</label>
                        //         <input className="form-control" type="text" name="confirmationCode" id="codeConfirmationInput" onChange={(e) => setConfirmationCode((e.target as HTMLInputElement).value)} placeholder="Digite o código de confirmação"/>
                        //     </div>
                        //     <button disabled={getSubmittingConfirmation} type="submit" className="btn btn-success">Confirmar</button>
                        // </form>
                    }
                    {!getSignedUp && 
                        <form onSubmit={handleSubmitSingUp}>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="usuario">Nome</label>
                                <input type="text" className="form-control" id="usuario" onChange={(e) => setName((e.target as HTMLInputElement).value)} placeholder="Digite seu nome"/>
                            </div>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="email">E-mail</label>
                                <input type="email" className="form-control" id="email" onChange={(e) => setEmail((e.target as HTMLInputElement).value)} placeholder="Digite seu melhor e-mail"/>
                            </div>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="usuario">Usuário</label>
                                <input type="text" className="form-control" id="usuario" onChange={(e) => setUsername((e.target as HTMLInputElement).value)} placeholder="Digite um usuário"/>
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