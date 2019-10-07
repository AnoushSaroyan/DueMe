import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../home/Home'
import Sidebar from '../sidebar/Sidebar'
import "./main_page.scss"
import CreateTeam from '../forms/CreateTeam';
import CreateProject from '../forms/CreateProject';


class MainPage extends Component {
    render() {
        return (<div className="main-page">
            <Sidebar/>
            <div className="black-bg"></div>
            <div className="main-view"> 
                    <Switch>
                        <Route exact path="/main/home" component={Home} />
                        <Route exact path="/main/new_team" component={CreateTeam} />
                        <Route exact path="/main/new_project" component={CreateProject} />
                        <Route exact path='/*' render={() => <Redirect to={{ pathname: "/main/home" }} />} />
                    </Switch>
            </div>
        </div>)
    }
}

export default MainPage