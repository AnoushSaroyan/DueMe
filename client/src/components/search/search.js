import React, { Component } from 'react';
import { IoIosSearch } from "react-icons/io";
import './search.scss'

class Search extends Component{
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            search: ""
        };

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(e) {
        e.preventDefault();
        this.setState({ editing: true });
    }


    render(){
        if (this.state.editing) {
            return (
            <div>
                <div className="main-header-search-bar">
                    <input className="header-search-input search-expand" value={this.state.search} ></input>
                    <IoIosSearch />
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
            </div>
            )
        }
    }
}

export default Search