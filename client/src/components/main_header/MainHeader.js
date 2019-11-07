import React, { Component } from 'react';
import { MdMenu } from "react-icons/md";
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { USER, PROJECT } from '../../graphql/queries';
import { MdAdd, MdStarBorder, MdStar, MdKeyboardArrowDown } from "react-icons/md";
import "./main-header.scss";
import { FiClipboard, FiCheckCircle, FiMessageCircle, FiUsers } from "react-icons/fi";
import { LOGOUT_USER, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, DELETE_PROJECT, DELETE_TEAM } from "../../graphql/mutations";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { FiFileText } from "react-icons/fi";
import Search from '../search/search'


class MainHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            page: this.props.page,
            projectColor: this.props.color,
            type: this.props.type,
            projectId: this.props.projectId,
            teamId: this.props.teamId
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
            let projectDropdown = document.getElementById("project-menu")
            if (projectDropdown) projectDropdown.classList.remove("active")
            let teamDropdown = document.getElementById("team-menu")
            if (teamDropdown) teamDropdown.classList.remove("active")
        })
        if (this.props.type === "project") {
            this.addBorderBottom()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.page !== this.props.page) {
            this.setState({
                page: this.props.page,
                projectColor: this.props.color,
                type: this.props.type,
                projectId: this.props.projectId,
                teamId: this.props.teamId
            })
        }

        // if ( prevProps.projectId && prevProps.projectId !== this.props.projectId){
        //     this.setState({
        //         projectId: this.props.projectId
        //     })
        // }

        if (this.props.type === "project") {
            this.addBorderBottom()
        }
    }

    addBorderBottom(){
        const header = document.getElementById("main-header")
        if (header) header.classList.add("header-border")
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

    handleFavorite(user){
        let favorites = user.projects
        let hasFavorite = favorites.find(project => project._id === this.state.projectId)
        if (hasFavorite){
            return (
            <Mutation
                mutation={REMOVE_FROM_FAVORITES}
                refetchQueries={() => {
                    return [
                        {
                            query: USER,
                            variables: { _id: localStorage.getItem("currentUserId") }
                        },
                    ]
                }}
            >
                {removeFromFavorites => (
                        <MdStar className="star-filled" onClick={() => removeFromFavorites({ variables: { _id: localStorage.getItem("currentUserId"), projectId: this.state.projectId }})} />
                )}
            </Mutation>
            )
        } else {
            return (
            <Mutation
                mutation={ADD_TO_FAVORITES}
                refetchQueries={() => {
                    return [
                        {
                            query: USER,
                            variables: { _id: localStorage.getItem("currentUserId") }
                        },
                    ]
                }}
            >
                {addToFavorites => (
                        <MdStarBorder className="star-empty" onClick={() => addToFavorites({ variables: { _id: localStorage.getItem("currentUserId"), projectId: this.state.projectId } })}/>
                )}
            </Mutation>
            )
        }
    }

    renderTitle(user){
        if (this.state.type === "project"){
            let color
            this.state.projectColor ? color = this.state.projectColor : color = "#e362e3"
            let projectColor = {
                backgroundColor: color
            } 
            return <div className="page-title"><div className="page-title-color-box" style={projectColor}><FiFileText className="page-title-inside" /></div>
            <h1>{this.state.page}</h1>
            {this.handleFavorite(user)}
            <div className="project-dropdown-wrapper">
                <MdKeyboardArrowDown className="project-dropdown-button" onClick={this.toggleDropMenu("project-menu")}/>
            </div>
            <div className="profile-menu project-menu" id="project-menu">
                    <div className="add-menu-items">
                        <ApolloConsumer>
                            {client => (
                                <Mutation
                                    mutation={DELETE_PROJECT}
                                    refetchQueries={() => {
                                        return [
                                            {
                                                query: USER,
                                                variables: { _id: localStorage.getItem("currentUserId") }
                                            },
                                        ]
                                    }}
                                    onCompleted={data => {
                                        this.props.history.push(`/main/home`);
                                    }}
                                >
                                    {deleteProject => (
                                        <div onClick={() => {
                                            deleteProject({ variables: { _id: this.state.projectId } })
                                        }} className="delete-task-button">Delete Project</div>
                                    )}
                                </Mutation>
                            )}
                        </ApolloConsumer>
                    </div>
            </div>
            </div>
        }

        if (this.state.type === "team"){
            return(
            <div className="page-title">
                <h1>{this.state.page}</h1>
                    <div className="project-dropdown-wrapper">
                        <MdKeyboardArrowDown className="project-dropdown-button" onClick={this.toggleDropMenu("team-menu")} />
                    </div>
                    <div className="profile-menu team-menu" id="team-menu">
                        <div className="add-menu-items">
                            <ApolloConsumer>
                                {client => (
                                    <Mutation
                                        mutation={DELETE_TEAM}
                                        refetchQueries={() => {
                                            return [
                                                {
                                                    query: USER,
                                                    variables: { _id: localStorage.getItem("currentUserId") }
                                                },
                                            ]
                                        }}
                                        onCompleted={data => {
                                            this.props.history.push(`/main/home`);
                                        }}
                                    >
                                        {deleteTeam => (
                                            <div onClick={() => {
                                                deleteTeam({ variables: { _id: this.state.teamId } })
                                            }} className="delete-task-button">Delete Team</div>
                                        )}
                                    </Mutation>
                                )}
                            </ApolloConsumer>
                        </div>
                    </div>
            </div>
            )
        }


        if (this.state.type === "user") {
            let color
            this.state.projectColor ? color = this.state.projectColor : color = "#e362e3"
            let projectColor = {
                backgroundColor: color
            }
            const abbreviatedName = this.state.page.split(" ").map(word => word[0])
            let rightLetters
            if (abbreviatedName.length === 1) {
                rightLetters = abbreviatedName[0]
            } else {
                rightLetters = [abbreviatedName[0] + abbreviatedName[abbreviatedName.length - 1]]
            }
            return <div className="page-title"><div className="page-title-color-box page-title-color-circle" style={projectColor}><div className="page-title-inside" >{rightLetters}</div></div><h1>{this.state.page}</h1></div>
        }


        return <div className="page-title"><h1>{this.state.page}</h1></div>
    }

    handleColorChange(){
        return (
            <div>
                <span onClick={this.handleOpen}>Change Color</span>
            </div>
        )
    }

    handleOpen(){
        const playlistForm = document.getElementById("project-popup");
        playlistForm.classList.add("active");
    }

    renderEmptyHeader(){
        return(
            <div className="main-header main-header-loading">
                <div className="main-header-wrapper" id="main-header">
                    <div className="la-ball-clip-rotate-multiple la-dark header-load">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        if (!localStorage.getItem("currentUserId")) {
            return <div></div>
        }


        return(
        <Query 
        query={USER} 
        variables={{ _id: localStorage.getItem("currentUserId") }}
        >
                {({ loading, error, data }) => {   
                    if (loading) return this.renderEmptyHeader();
                    if (error) return <option>{`Error! ${error}`}</option>;
                       const { user } = data
                       const abbreviatedName = user.name.split(" ").map(word => word[0])
                       let rightLetters
                       if (abbreviatedName.length === 1) {
                           rightLetters = abbreviatedName[0]
                       } else {
                           rightLetters = [abbreviatedName[0] + abbreviatedName[abbreviatedName.length - 1]]
                       }

                       let color
                       user.color ? color = user.color : color = "#e362e3"

                       let profileColor = {
                           backgroundColor: color
                       }

                        return<div className="main-header">
                            <div className="main-header-wrapper" id="main-header">
                            <div id="main-ham" className="main-ham hidden-ham" onClick={this.handleSidebarCollapse}><MdMenu /></div>
                            {this.renderTitle(user)}
                            <div className="main-header-right">
                                <Search user={user}/>
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
                                        <div className="main-header-avatar-pic" style={profileColor}>
                                            {rightLetters}
                                        </div>
                                    </div>
                                    <div className="profile-menu" id="profile-menu">
                                        <div className="add-menu-items profile-items">
                                            {this.handleColorChange()}
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
                                                            <div onClick={() => logout({ variables: { _id: localStorage.getItem("currentUserId") }})} className="logout-button">Logout</div>
                                                        )}
                                                    </Mutation>
                                                )}
                                            </ApolloConsumer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
            }}
        </Query>   
        )
    }
}

export default withRouter(MainHeader)
