import React, { useState, FormEvent, useEffect } from 'react';
import { Auth, Cache } from 'aws-amplify';
import Toast from 'react-bootstrap/Toast';

import Header from '../Header/Header';

import logo from '../../assets/logo.png';

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [,setIsSigningOut] = useState<boolean>(false);
    const [rememberCheckbox, setRememberCheckbox] = useState<boolean>(false);
    const [tokenId, setTokenId] = useState<string>('');
    const [refreshToken, setRefreshToken] = useState<string>('');

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

    useEffect(()=>{
        setIsSigningIn(true);
        Auth.currentSession()
            .then((responseUserSession) => {
                showToastFunction("Usuário conectado!", 2);
                setSignedIn(true);
                setIsSigningIn(false);
                setTokenId(responseUserSession.getIdToken().getJwtToken());
                setRefreshToken(responseUserSession.getRefreshToken().getToken());
            })
            .catch((err) => {
                setIsSigningIn(false);
                console.log(err)
            });
    }, []);

    function handleSubmit(event: FormEvent){
        event.preventDefault();
        if(!signedIn){
            if(!username || !password){
                showToastFunction('Preencha todos os campos.', 1);
                return;
            }
            setIsSigningIn(true);
            Auth.signIn({username, password})
            .then((responseCognitoUser) => {
                console.log("Conectado!!!");
                console.log("CognitoUser");
                console.log(responseCognitoUser);
                Auth.currentSession()
                .then((responseUserSession) => {
                    console.log("Current session: ")
                    console.log(responseUserSession);
                    setSignedIn(true);
                    setIsSigningIn(false);
                    setTokenId(responseUserSession.getIdToken().getJwtToken());
                    setRefreshToken(responseUserSession.getRefreshToken().getToken());
                })
                .catch(err => {
                    showToastFunction("Erro na autenticação do usuário. " + err.code, 1);
                    setIsSigningIn(false);
                })
            }).catch(err => {
                if(err.code === "NotAuthorizedException"){
                    showToastFunction("Usuário/email ou senha incorretos. Verifique-os e tente novamente.", 1);
                }
            })
        }
    }

    function handleLogout(){
        if(signedIn){
            setIsSigningOut(true);
            Auth.signOut()
            .then(response => {
                setSignedIn(false);
                setIsSigningOut(false);
                setTokenId('');
                setRefreshToken('');
                console.log(response);
            }).catch(err => {
                setIsSigningOut(false);
                console.log(err);
            })
        }
    }

    function changeAuthStorageConfiguration(){
        if(rememberCheckbox){
            //less volatile storage
            const localStorageCache = Cache.createInstance({
                keyPrefix: "localStorageAuthCache",
                storage: window.localStorage
            });
            Auth.configure({
                storage: localStorageCache
            });
        }else{
            //more volatile storage
            const sessionStorageCache = Cache.createInstance({
                keyPrefix: "sessionAuthCache",
                storage: window.sessionStorage
            })
            Auth.configure({
                storage: sessionStorageCache
            })
        }
    }

    return (
        <>
            <Header/>
            <Toast show={showToast} onClose={toggleShowToast} delay={5000} autohide style={{position: 'fixed', bottom: 0, right: 0, zIndex: 999, maxWidth: '200px'}}>
                <Toast.Header className={toastClassName} >
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">{toastTitle}</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
            <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded">
                {!signedIn &&
                    <div className="row justify-content-center mt-5 mb-5"><img src={logo} style={{width:'24%', height: '24%'}} alt="logo"/></div>
                }
                <div className="row justify-content-center mt-2 mb-5">
                    {signedIn && 
                        <>
                            <p className="text-danger h2">Seja Bem-Vindo</p>
                            <div className="row justify-content-center mt-5 mb-5"><img src={logo} style={{width:'48%', height: '96%'}} alt="logo"/></div>                    
                            <button className="btn-toggle btn btn-danger" onClick={handleLogout}>Desconectar</button>
                        </>
                    }
                    {/* {signedIn &&
                        <>
                            <p>tokenID: {tokenId}</p>
                            <p>refreshToken: {refreshToken}</p>
                        </>
                    } */}
                    {!signedIn &&
                        <form className="text-center" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="usernameSignIn">Usuário/E-mail</label>
                                <input className="form-control" type="text" name="username" id="usernameSignIn" onChange={(e) => setUsername((e.target as HTMLInputElement).value)} placeholder="Digite seu usuário ou e-mail"/>
                            </div>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="passwordSignIn">Senha</label>
                                <input className="form-control" type="password" name="password" id="passwordSignIn" onChange={(e) => setPassword((e.target as HTMLInputElement).value)} placeholder="Digite sua senha"/>
                            </div>
                            <div className="form-group form-check">
                                <input defaultChecked type="checkbox" className="form-check-input" id="rememberMeSignIn" onChange={() => {setRememberCheckbox(!rememberCheckbox); changeAuthStorageConfiguration()}} />
                                <label className="form-check-label" htmlFor="rememberMeSignIn">Lembrar-se de mim</label>
                            </div>
                            <button disabled={isSigningIn} type="submit" className="btn btn-primary">Entrar</button>
                        </form>
                    }
                </div>
            </div>
        </>
    )
}

export default Login;