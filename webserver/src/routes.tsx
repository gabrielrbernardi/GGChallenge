import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import Root from './components/Root/Root';

import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';

const Routes = () =>{
    return (
        <BrowserRouter >
            <Switch>
                <Route path="/" render={() => <Root/>} exact/>
                <Route path="/signup" render={() => <SignUp/>} exact/>
                <Route path="/login" render={() => <Login/>} exact/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;