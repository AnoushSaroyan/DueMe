import React, { Component } from 'react';
import { IoIosSearch } from "react-icons/io";
import './search.scss';
import { MdPeopleOutline } from "react-icons/md";
import { Link } from 'react-router-dom';


class Search extends Component{
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            search: "",
            currentlyDisplayed: [],
            tasks: [],
            projects: [],
            teams: [],
            users: []
        };
        this.suggestionsElement = ""
        this.handleEdit = this.handleEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        let suggestionDiv = document.getElementById("search-suggestions")
        const body = document.getElementsByTagName("body")[0];
        body.addEventListener("click", (event) => {
            suggestionDiv.classList.remove("active")
            this.closeEdit()
        })
    }
    
    componentDidUpdate(){
        if (!this.suggestionsElement){
            this.suggestionsElement = document.getElementById("search-suggestions")
        }
    }

    handleEdit(e) {
        e.preventDefault();
        this.setState({ editing: true });
    }

   closeEdit(e) {
        // e.preventDefault();
        this.setState({ editing: false });
    }

    onInputChange(e) {
        let suggestionDiv = document.getElementById("search-suggestions")
        if(suggestionDiv) suggestionDiv.classList.add("active")
        // let newDisplayed = this.props.items.filter(item => item.title.match(new RegExp(e.target.value, "i")))
        let teams = []
        let projects = []
        let tasks = []
        let users = []
        this.props.user.teams.forEach(team => {
                team.users.forEach(user => {
                    if (user.name.match(new RegExp(e.target.value, "i")) && !users.includes(user)) users.push(user)
                })


            if (team.name.match(new RegExp(e.target.value, "i"))) teams.push(team)
            team.projects.forEach(project => {
                if (project.name.match(new RegExp(e.target.value, "i"))) projects.push(project)
                project.tasks.forEach(task => {
                    if (task.title.match(new RegExp(e.target.value, "i"))) tasks.push(task)
                })
            })
        } )
        this.setState({
            search: e.target.value,
            tasks: tasks,
            projects: projects,
            teams: teams,
            users: users
        })
    }

    renderSuggestions() {
        let cutTeam
        if (this.state.teams) cutTeam = this.state.teams
            .reverse().slice(-3).reverse()
            .map(item => <Link key={item._id} className="search-suggestion search-teams-item" ><MdPeopleOutline/>{item.name ? item.name : item.title}</Link>)
        // return cut\
        let displayTeam
        if (cutTeam.length > 0) {
        displayTeam = (
            <div className="search-teams">
                <div className="search-teams-items-header">Teams</div>
                {cutTeam}
            </div>
        )}

        let cutUser
        if (this.state.users) cutUser = this.state.users
            .reverse().slice(-3).reverse()
        .map(user => {
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
        
            return <Link to={`/main/user/${user._id}`} key={user._id} className="search-suggestion search-teams-item" >
                <div className="main-header-avatar-pic search-pic" style={profileColor} >
                    {rightLetters}
                </div>
                <div>{user.name}</div>
                <div className="search-user-email">{user.email}</div>
                </Link>})
        // return cut\
        let displayUser
        if (cutUser.length > 0) {
            displayUser = (
                <div className="search-teams">
                    <div className="search-teams-items-header">Users</div>
                    {cutUser}
                </div>
            )
        }
    

        return(
            <div>
                {displayTeam}
                {displayUser}
                {/* <div className="search-people">
                    {users}
                </div>
                <div className="search-projects">
                    {projects}
                </div>
                <div className="search-task">
                    {tasks}
                </div> */}
            </div>
        )
    }

    render(){
        if (this.state.editing) {
            return (
            <div>
                <div className="main-header-search-bar">
                    <input className="header-search-input search-expand" value={this.state.search} onChange={this.onInputChange} ></input>
                    <IoIosSearch />
                </div>
                <div className="search-suggestions" id="search-suggestions">
                    {this.renderSuggestions()}
                </div>
            </div>

            )
        }  else {
            return (
            <div>
                <div className="main-header-search-bar">
                    <input className="header-search-input" value={this.state.search} onClick={this.handleEdit}></input>
                    <IoIosSearch />
                </div>
                <div className="search-suggestions search-suggestions-minimized" id="search-suggestions">
                    {/* {this.renderSuggestions()} */}
                </div>
            </div>
            )
        }
    }
}

export default Search