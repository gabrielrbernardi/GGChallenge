import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Toast from 'react-bootstrap/Toast';

import logo from '../../assets/logo.png';

const VerifyCode = (props?: any) => {
    const history = useHistory();

    const [username, setUsername] = useState<string>('');
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

    async function handleSubmitConfirmationSignUp(event: FormEvent){
        event.preventDefault();
        if(!username || !getConfirmationCode){
            showToastFunction("Preencha todos os campos.", 1);
            return;
        }
        await Auth.confirmSignUp(username, getConfirmationCode)
        .then((response) => {
            if(response === "SUCCESS"){
                setShowToast(true);
                showToastFunction("Código verificado. Você será redirecionado para fazer login no sistema.", 2);
                setTimeout(() => {
                    history.push('/login');
                }, 4000);
            }
            console.log(response);
        })
        .catch(err => {
            console.log(err);
            if(err.code === "ExpiredCodeException"){
                showToastFunction("Código inválido. Por favor, solicite um novo código.", 1);
            }
        })
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
            {!props.child && 
                <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded">
                    <div className="row justify-content-center mt-5 mb-5"><img src={logo} style={{width:'25%', height: '25%',  minWidth: '80px', minHeight: '50px'}} alt="logo"/></div>
                    <div className="row justify-content-center mt-2 mb-5">
                        <form onSubmit={handleSubmitConfirmationSignUp}>
                            <div className="form-group">
                                <label htmlFor="usernameConfirmationInput">Username</label>
                                <input className="form-control" type="text" name="username" id="usernameConfirmationInput" onChange={(e) => setUsername((e.target as HTMLInputElement).value)} placeholder="Digite seu usuário" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="codeConfirmationInput">Código de confirmação</label>
                                <input className="form-control" type="text" name="confirmationCode" id="codeConfirmationInput" onChange={(e) => setConfirmationCode((e.target as HTMLInputElement).value)} placeholder="Digite o código de confirmação"/>
                            </div>
                            <button type="submit" className="btn btn-success">Confirmar</button>
                        </form>
                    </div>
                </div>
            }
            {props.child && 
                <form onSubmit={handleSubmitConfirmationSignUp}>
                    <div className="form-group">
                        <label htmlFor="usernameConfirmationInput">Username</label>
                        <input className="form-control" type="text" name="username" id="usernameConfirmationInput" onChange={(e) => setUsername((e.target as HTMLInputElement).value)} placeholder="Digite seu usuário" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="codeConfirmationInput">Código de confirmação</label>
                        <input className="form-control" type="text" name="confirmationCode" id="codeConfirmationInput" onChange={(e) => setConfirmationCode((e.target as HTMLInputElement).value)} placeholder="Digite o código de confirmação"/>
                    </div>
                    <button type="submit" className="btn btn-success">Confirmar</button>
                </form>
            }
        </>
    )
}

export default VerifyCode;