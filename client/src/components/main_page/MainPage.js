import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../home/Home'
import Sidebar from '../sidebar/Sidebar'
import "./main_page.scss"


class MainPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div className="player">
            <Sidebar/>
            <div className="black-bg"></div>
            <div className="main-view">
                <div className="scroll-wrapper">
                    <Switch>
                        <div>Hi</div>
                        {/* <Route className="player-main-view" exact path="/main/" component={Home} /> */}
                    </Switch>
                </div>
            </div>
        </div>)
    }
}

export default MainPage