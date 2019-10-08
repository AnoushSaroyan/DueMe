import React, { Component } from 'react';
import { MdMenu } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

import "./main-header.scss";

class MainHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            page: this.props.page
        }
    }

    componentDidUpdate(){
    }

    handleHamburger(){
            return <div className="main-ham" onClick={this.handleSidebarCollapse}><MdMenu /></div>
    }

    handleSidebarCollapse(){
        const sidebar = document.getElementById("sidebar")
        sidebar.classList.remove("collapsed")
    }

    render(){
        return<div className="main-header">
            {this.handleHamburger()}
            <div className="page-title"><h1>{this.state.page}</h1></div>
            <div className="main-header-right">
                <div className="main-header-search-bar">
                    <input className="header-search-input"></input>
                    <IoIosSearch/>
                </div>
            </div>
        </div>
    }
}

export default MainHeader