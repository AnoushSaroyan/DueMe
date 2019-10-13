import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.scss";
import "./loading.scss"
import { MdMenu, MdKeyboardArrowLeft, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { FiHome, FiCheckCircle, FiBell } from "react-icons/fi";
import { Query } from 'react-apollo';
import { USER } from '../../graphql/queries';
import TeamSubMenu from './TeamSubMenu';
// import { GoPerson } from "react-icons/go";
// import { GiBookshelf } from "react-icons/gi";
// import { FaPlus } from "react-icons/fa";
// import { FiArrowDownCircle } from "react-icons/fi";
// import { withRouter } from 'react-router-dom';
import UserIndex from "../conversations/UserIndex";
import { FaSquare } from "react-icons/fa";


class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: props.currentUser,
            favorites: true,
            teams: true,
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

    handleFavorites(user){
        let projects
        projects = user.projects.map(project => {
            let color
            project.color ? color = project.color : color = "#e362e3"

            let projectColor = {
                color: color
            }
            return (
                <div className="team-submenu-project" key={project._id}><Link to={`/main/project/${project._id}`}><FaSquare style={projectColor} />{project.name}</Link></div>
            )
        })


        if (this.state.favorites) {
            return(
                <div className ="sidebar-submenus">
                    <div className="sidebar-submenus-header noselect" onClick={this.handleCollapse("favorites")}><h2>Favorites</h2><MdKeyboardArrowUp /></div>
                    <ul className="sidebar-submenus-list">
                        {projects}
                    </ul>
                </div>
                )
        } else {
            return (
                <div className="sidebar-submenus">
                    <div className="sidebar-submenus-header noselect" onClick={this.handleCollapse("favorites")}><h2>Favorites</h2><MdKeyboardArrowDown/></div>
                </div>
            )
        }
    }

    handleTeams(user){
        let teams = []
        teams = user.teams.map(team => <TeamSubMenu team={team} key={team._id}/>)

        if (this.state.teams){
            return (
                <div className="sidebar-submenus">
                    <div className="sidebar-submenus-header noselect" onClick={this.handleCollapse("teams")}><h2>Teams</h2><MdKeyboardArrowUp /></div>
                    <ul className="sidebar-submenus-list">
                        {teams}
                    </ul>
                </div>
            )
        } else{
            return(
            <div className="sidebar-submenus">
                <div className="sidebar-submenus-header noselect" onClick={this.handleCollapse("teams")}><h2>Teams</h2><MdKeyboardArrowDown /></div>
            </div>
            )
        }
        return <div></div>
    }

    handleCollapse(menu){
        return () => {
        this.setState({
            [menu]: !this.state[menu]
        })}
    }

    renderEmptySidebar(){
        return(
            <section className="sidebar" id="sidebar">
                <div className="sidewrapper">
                    <div className="sidelogo">
                        <Link to='/main/home' >
                            <img src="images/icon.png" alt="Dueme" />
                            <div>DueMe</div>
                        </Link>
                        <div className="sidebar-ham"><MdKeyboardArrowLeft /><MdMenu /></div>
                    </div>
                    <nav className="sidebar-main-nav">
                        <Link className="sidebar-items" to='/main/home' >
                            <FiHome /><div>Home</div>
                        </Link>
                        <Link className="sidebar-items" to='/main/task' >
                            <FiCheckCircle /><div>My Tasks</div>
                        </Link>
                        <Link className="sidebar-items" to={`/player/user/`} >
                            <FiBell /><div>Inbox</div>
                        </Link>
                    </nav>
                    <div className="la-ball-clip-rotate-multiple la-3x sidebar-load">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </section>
        )
    }

    render() {
        if (!localStorage.getItem("currentUserId")){
            return <div></div>
        }

        return (
        <Query query={USER} variables={{ _id: localStorage.getItem("currentUserId")}}>
            {({ loading, error, data }) => {     
                if (loading) return this.renderEmptySidebar();
                if (error) return <option>{`Error! ${error}`}</option>;
                const { user } = data

                
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
                        {this.handleFavorites(user)}
                        {this.handleTeams(user)}
                        <div >
                            <UserIndex  />
                        </div>
                    </div>


                    </div>
                </section>
            }}
        </Query>
        )
    }
}

export default Sidebar