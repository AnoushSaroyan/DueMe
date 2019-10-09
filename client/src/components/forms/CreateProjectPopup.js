import React, { Component } from 'react';
import { MdClear } from "react-icons/md";
import { withRouter, Link } from 'react-router-dom';
import "./create-project-popup.scss";


class CreateProjectPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose() {
        const playlistForm = document.getElementById("project-popup");
        playlistForm.classList.remove("active");
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createPlaylist(this.state).then(data => {
            this.props.history.push(`/player/playlists/${data.playlist.id}`)
            const playlistForm = document.getElementById("project-popup");
            playlistForm.classList.remove("active");
        })

    }

    update() {
        return e => this.setState({ name: e.target.value })
    }

    render() {
        return (
            <div className="dialog" id="project-popup">
                <div className="project-popup-wrapper">
                    <h1>Hold up!</h1>
                    <h2>You gotta create a team first!</h2>
                    <Link to="/main/team/new">Create Team</Link>
                </div>
            </div>
        )
    }

}

export default withRouter(CreateProjectPopup)