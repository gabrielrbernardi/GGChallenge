import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import Header from './components/Header/Header';

import Root from './components/Root/Root';

import SignUp from './components/SignUp/SignUp';
import VerifyCode from './components/SignUp/VerifyCode';
import Login from './components/Login/Login';

import Home from './components/Home/Home';

import Dashboard from './components/Dashboard/Dashboard';

const Routes = () =>{
    return (
        <BrowserRouter >
            <Switch>
                <Route path="/" render={() => <div><Header/><Root/></div>} exact/>
                <Route path="/signup" render={() => <div><Header/><SignUp/></div>} exact/>
                <Route path="/verifyCode" render={() => <div><Header/><VerifyCode/></div>} exact/>
                <Route path="/login" render={() => <div><Login/></div>} exact/>
                <Route path="/home" render={() => <div><Home/></div>} exact/>
                <Route path="/dashboard" render={() => <div><Dashboard/></div>} exact/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;