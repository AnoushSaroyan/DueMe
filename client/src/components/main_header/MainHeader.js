import React, { Component } from 'react';
import { MdMenu } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Query, ApolloConsumer } from 'react-apollo';
import { USER } from '../../graphql/queries';

import "./main-header.scss";

class MainHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            page: this.props.page
        }
    }

    handleSidebarCollapse(){
        const sidebar = document.getElementById("sidebar")
        const headerHam = document.getElementById("main-ham")
        headerHam.classList.add("hidden-ham")
        sidebar.classList.remove("collapsed")
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
                       const abbreviatedName = user.name.split(" ").map(word => word[0]).join(" ")
                        return<div className="main-header">
                            <div id="main-ham" className="main-ham hidden-ham" onClick={this.handleSidebarCollapse}><MdMenu /></div>
                            <div className="page-title"><h1>{this.state.page}</h1></div>
                            <div className="main-header-right">
                                <div className="main-header-search-bar">
                                    <input className="header-search-input"></input>
                                    <IoIosSearch/>
                                </div>
                                <div>
                                    <div>
                                        {abbreviatedName}
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

export default MainHeader