import React, { useState, FormEvent, useEffect } from 'react';
import Header from '../Header/Header';

import logo from '../../assets/logo.png';
import { Auth, Cache } from 'aws-amplify';

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [,setIsSigningOut] = useState<boolean>(false);
    const [rememberCheckbox, setRememberCheckbox] = useState<boolean>(false);
    const [tokenId, setTokenId] = useState<string>('');
    const [refreshToken, setRefreshToken] = useState<string>('');

    useEffect(()=>{
        setIsSigningIn(true);
        Auth.currentSession()
            .then((responseUserSession) => {
                console.log("Current session: ")
                console.log(responseUserSession);
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
                    setIsSigningIn(false);
                    console.log(err);
                })
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
            <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded">
                <div className="row justify-content-center mt-5 mb-5"><img src={logo} style={{width:'24%', height: '24%'}} alt="logo"/></div>
                <div className="row justify-content-center mt-2 mb-5">
                    {signedIn &&
                        <>
                            <p>tokenID: {tokenId}</p>
                            <p>refreshToken: {refreshToken}</p>
                            <button className="btn-toggle btn btn-danger" onClick={handleLogout}>Sair</button>
                        </>
                    }
                    {!signedIn &&
                        <form className="text-center" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="usernameSignIn">Username</label>
                                <input className="form-control" type="text" name="username" id="usernameSignIn" onChange={(e) => setUsername((e.target as HTMLInputElement).value)} />
                            </div>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="passwordSignIn">Senha</label>
                                <input className="form-control" type="password" name="password" id="passwordSignIn" onChange={(e) => setPassword((e.target as HTMLInputElement).value)} />
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