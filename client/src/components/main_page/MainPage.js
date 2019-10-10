import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../home/Home';
import Task from '../task/Task';
import Sidebar from '../sidebar/Sidebar';
import "./main_page.scss";
import CreateTeam from '../forms/CreateTeam';
import CreateProject from '../forms/CreateProject';
import CreateTask from '../task/CreateTask';
import Calendar from '../calendar/Calendar';
import Chat from "../conversations/Chat";
import Project from '../project/Project';
import CreateProjectPopup from '../forms/CreateProjectPopup';

class MainPage extends Component {
    render() {
        return (<div className="main-page">
            <CreateProjectPopup thing={"userColor"} />
            <Sidebar/>
            <div className="black-bg"></div>
            <div className="main-view"> 
                    <Switch>
                        <Route exact path="/main/home" component={Home} />
                        <Route exact path="/main/task" component={Task} />
                        <Route exact path="/main/team/new" component={CreateTeam} />
                        <Route exact path="/main/task/new" component={CreateTask} />
                        <Route exact path="/main/project/new" component={CreateProject} />
                        <Route exact path="/main/project/:id" component={Project} />
                        <Route exact path="/main/calendar" component={Calendar} />
                        <Route exact path="/main/chat/5d9d793387779a44b5c2d90f" component={Chat} />
                        <Route exact path='/*' render={() => <Redirect to={{ pathname: "/main/home" }} />} />
                    </Switch>
            </div>
        </div>)
    }
}

export default MainPage