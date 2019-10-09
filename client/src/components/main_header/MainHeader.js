import React, { Component } from 'react';
import { MdMenu } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { USER } from '../../graphql/queries';
import { MdAdd } from "react-icons/md";
import "./main-header.scss";
import { FiClipboard, FiCheckCircle, FiMessageCircle, FiUsers } from "react-icons/fi";
import { LOGOUT_USER } from "../../graphql/mutations";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';


class MainHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            page: this.props.page
        }
    }

    componentDidMount() {
        const body = document.getElementsByTagName("body")[0];
        body.addEventListener("click", (event) => {
            // let screen = document.getElementById("smoke-screen")
            // if (screen) screen.classList.remove("active")
            let addDropdown = document.getElementById("header-add-menu")
            if (addDropdown) addDropdown.classList.remove("active")
            let accountDropdown = document.getElementById("profile-menu")
            if (accountDropdown) accountDropdown.classList.remove("active")
        })
    }

    handleSidebarCollapse(){
        const sidebar = document.getElementById("sidebar")
        const headerHam = document.getElementById("main-ham")
        headerHam.classList.add("hidden-ham")
        sidebar.classList.remove("collapsed")
    }

    toggleDropMenu(button){
        return(e) =>{
            let dropDown = document.getElementById(button)
            if (dropDown) dropDown.classList.add("active")
        }
    }

    render(){
        if (!localStorage.getItem("currentUserId")) {
            return <div></div>
        }


        return(
        <Query query={USER} variables={{ _id: localStorage.getItem("currentUserId") }}>
                {({ data }) => {   
                   if (data) {
                       const { user } = data
                       const abbreviatedName = user.name.split(" ").map(word => word[0])
                       let rightLetters
                       if (abbreviatedName.length === 1) {
                           rightLetters = abbreviatedName[0]
                       } else {
                           rightLetters = [abbreviatedName[0] + abbreviatedName[abbreviatedName.length - 1]]
                       }
                        return<div className="main-header">
                            <div id="main-ham" className="main-ham hidden-ham" onClick={this.handleSidebarCollapse}><MdMenu /></div>
                            <div className="page-title"><h1>{this.state.page}</h1></div>
                            <div className="main-header-right">
                                <div className="main-header-search-bar">
                                    <input className="header-search-input"></input>
                                    <IoIosSearch/>
                                </div>
                                <div className="main-header-add-button-wrapper">
                                    <div className="main-header-add-button" onClick={this.toggleDropMenu("header-add-menu")}>
                                        <MdAdd/>
                                        New
                                    </div>
                                    <div className="header-add-menu" id="header-add-menu">
                                        <div className="add-menu-items">
                                            <Link to="/main/task/new"><FiCheckCircle />Task</Link>
                                            <Link to="/main/project/new"><FiClipboard/>Project</Link>
                                            <Link to="/main/team/new"><FiUsers />Team</Link>
                                            <Link to="/main/"><FiMessageCircle />Conversation</Link>
                                        </div>
                                        <div className="menu-caret-positioner">
                                            <div className="caret"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-header-avatar-wrapper">
                                    <div className="main-header-avatar" onClick={this.toggleDropMenu("profile-menu")}>
                                        <div className="main-header-avatar-pic">
                                            {rightLetters}
                                        </div>
                                    </div>
                                    <div className="profile-menu" id="profile-menu">
                                        <div className="add-menu-items profile-items">
                                            <ApolloConsumer>
                                                {client => (
                                                    <Mutation
                                                        mutation={LOGOUT_USER}
                                                        onCompleted={()=>{
                                                            localStorage.setItem("auth-token", "");
                                                            localStorage.setItem("currentUserId", "");
                                                            client.cache.writeData({
                                                                data: {
                                                                    isLoggedIn: false
                                                                }
                                                            });
                                                            this.props.history.push("/");
                                                        }}
                                                    >
                                                        {logout => (
                                                            <div onClick={() => logout({ variables: { _id: localStorage.getItem("currentUserId") }})}>Logout</div>
                                                        )}
                                                    </Mutation>
                                                )}
                                            </ApolloConsumer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    } else {
                        return <div></div>
                    }
            }}
        </Query>   
        )
    }
}

export default withRouter(MainHeader)
