import React, { Component } from 'react';
import { IoIosSearch } from "react-icons/io";
import './search.scss'

class Search extends Component{
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            search: "",
            currentlyDisplayed: []
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
        e.preventDefault();
        this.setState({ editing: false });
    }

    onInputChange(e) {
        let suggestionDiv = document.getElementById("search-suggestions")
        if(suggestionDiv) suggestionDiv.classList.add("active")
        // let newDisplayed = this.props.items.filter(item => item.title.match(new RegExp(e.target.value, "i")))
        let teams = []
        let projects = []
        let tasks = []
        this.props.user.teams.forEach(team => {
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
            currentlyDisplayed: tasks
        })
    }

    renderSuggestions() {
        let cut
        if (this.state.currentlyDisplayed) cut = this.state.currentlyDisplayed
            .reverse().slice(-12).reverse()
            .map(item => <div key={item._id} className="search-suggestion" >{item.name ? item.name : item.title}</div>)
        return cut
    }

    render(){
        if (this.state.editing) {
            return (
            <div>
                <div className="main-header-search-bar">
                    <input className="header-search-input search-expand" value={this.state.search} onChange={this.onInputChange} onBlur={this.closeEdit}></input>
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
                <div className="search-suggestions" id="search-suggestions">
                    {this.renderSuggestions()}
                </div>
            </div>
            )
        }
    }
}

export default Search