import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import "./sidebar.scss";
import { MdMenu, MdKeyboardArrowLeft, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { MdHome, MdSearch } from "react-icons/md";
import { FiHome, FiCheckCircle, FiBell } from "react-icons/fi";
import { Query, ApolloConsumer } from 'react-apollo';
import { USER } from '../../graphql/queries';
// import { GoPerson } from "react-icons/go";
// import { GiBookshelf } from "react-icons/gi";
// import { FaPlus } from "react-icons/fa";
// import { FiArrowDownCircle } from "react-icons/fi";
// import { withRouter } from 'react-router-dom';


class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: props.currentUser,
            favorites: true,
        }
        this.handleCollapse = this.handleCollapse.bind(this)
    }


    componentDidMount() {
        // this.props.currentUser.playlists.forEach(playlist => this.props.requestPlaylist(playlist.id))
    }

    handleSidebarHide() {
        const sidebar = document.getElementById("sidebar")
        const headerHam = document.getElementById("main-ham")
        sidebar.classList.add("collapsed")
        headerHam.classList.remove("hidden-ham")
    }

    handleFavorites(){
        if (this.state.favorites) {
            return(
                <div className ="sidebar-favorites">
                    <div className="sidebar-favorites-header noselect" onClick={this.handleCollapse("favorites")}><h2>Favorites</h2><MdKeyboardArrowUp /></div>
                    <ul className="sidebar-favorites-list">
                        <li><Link>test 1</Link></li>
                        <li><Link>test 2</Link></li>
                    </ul>
                </div>
                )
        } else {
            return (
                <div className="sidebar-favorites">
                    <div className="sidebar-favorites-header noselect" onClick={this.handleCollapse("favorites")}><h2>Favorites</h2><MdKeyboardArrowDown/></div>
                </div>
            )
        }
    }

    handleCollapse(menu){
        return () => {
        this.setState({
            [menu]: !this.state[menu]
        })}
    }

    render() {
        if (!localStorage.getItem("currentUserId")){
            return <div></div>
        }

        return (
        <Query query={USER} variables={{ _id: localStorage.getItem("currentUserId")}}>
            {({ data }) => {               
                return<section className="sidebar" id="sidebar">
                    <div className="sidewrapper">
                    <div className="sidelogo">
                        <Link to='/main/home' >
                            <img src="images/icon.png" alt="Dueme" />
                            <div>DueMe</div>
                        </Link>
                        <div onClick={this.handleSidebarHide} className="sidebar-ham"><MdKeyboardArrowLeft/><MdMenu /></div>
                    </div>

                    <nav className="sidebar-main-nav">
                        <Link className="sidebar-items" to='/main/home' >
                            <FiHome/><div>Home</div>
                        </Link>
                        <Link className="sidebar-items" to='/main/task' >
                            <FiCheckCircle/><div>My Tasks</div>
                        </Link>
                        <Link className="sidebar-items" to={`/player/user/`} >
                            <FiBell/><div>Inbox</div>
                        </Link>
                    </nav>
                    <div className="sidebar-scroll-wrapper">
                        {this.handleFavorites()}
                    </div>
                    </div>
                </section>
            }}
        </Query>
        )
    }
}

export default Sidebar