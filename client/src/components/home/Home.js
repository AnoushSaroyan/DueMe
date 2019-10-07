import React, { Component } from 'react';
import MainHeader from '../main_header/MainHeader';
import './home.scss'


class Home extends Component {
    render(){
        return <div>
            <MainHeader page={"Home"}/>
            <div className="scroll-wrapper">
                <div className="home-page">
                    Hi
                </div>
            </div>
        </div>
    }
}

export default Home