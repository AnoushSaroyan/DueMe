import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from "./components/session/Login";
import AuthRoute from './util/route_util';
// import Nav from "./components/Nav";
import Splash from "./components/splash/Splash";
import Register from "./components/session/Register";
import MainPage from './components/main_page/MainPage'


const App = () => {
    return (
        <div>
            <Switch>
                <AuthRoute exact path="/login" component={Login} routeType="auth" />
                <AuthRoute exact path="/register" component={Register} routeType="auth" />
                <AuthRoute path="/main" component={MainPage} routeType="protected" />
                <AuthRoute exact path="/splash" component={Splash} routeType="auth"/>
                <Route exact path='/*' render={() => <Redirect to={{ pathname: "/main" }} />} />
            </Switch>
        </div>
    );
};

export default App;