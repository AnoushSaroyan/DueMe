import React from "react";
import { Route, Switch } from 'react-router-dom';
import Login from "./components/session/Login";
import AuthRoute from './util/route_util';
// import Nav from "./components/Nav";
import Splash from "./components/splash/Splash";
import Register from "./components/session/Register";


const App = () => {
    return (
        <div>
            {/* <Nav /> */}
            <Switch>
                <AuthRoute exact path="/login" component={Login} routeType="auth" />
                <AuthRoute exact path="/register" component={Register} routeType="auth" />
                <Route exact path="/" component={Splash} />
            </Switch>
        </div>
    );
};

export default App;