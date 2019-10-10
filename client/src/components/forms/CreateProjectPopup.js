import React, { Component } from 'react';
import { MdClear } from "react-icons/md";
import { withRouter, Link } from 'react-router-dom';
import "./create-project-popup.scss";


class CreateProjectPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            thing: this.props.thing
        };
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        const playlistForm = document.getElementById("project-popup");
        playlistForm.classList.remove("active");
    }

    render() {
        return (
            <div className="dialog" id="project-popup">
                <div className="project-popup-wrapper">
                    <h1>Hold up!</h1>
                    <h2>You gotta create a {this.state.thing.toLowerCase()} first!</h2>
                    <Link to={`/main/${this.state.thing.toLowerCase()}/new`}>Create {this.state.thing}</Link>
                </div>
            </div>
        )
    }

}

export default withRouter(CreateProjectPopup)