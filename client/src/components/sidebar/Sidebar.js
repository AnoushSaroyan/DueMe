import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import "./sidebar.scss";
// import { MdHome, MdSearch } from "react-icons/md";
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
            playlists: [],
        }


    }


    componentDidMount() {
        // this.props.currentUser.playlists.forEach(playlist => this.props.requestPlaylist(playlist.id))
    }

    handlePlaylistForm() {
        const playlistForm = document.getElementById("playlist-form")
        playlistForm.classList.add("active")
    }

    // handlePlaylist() {
    //     if (this.state.playlists.length > 0) {
    //         return this.props.playlists.map(playlist => <li key={playlist.id}><Link to={`/player/playlists/${playlist.id}`}>{playlist.name}</Link></li>)
    //     }
    //     // return this.props.currentUser.playlists.map(playlist => <li key={playlist.id}><Link to={`/player/playlists/${playlist.id}`}>{playlist.name}</Link></li>)
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.playlists.length === 0 && this.props.playlists.length > 0) {
    //         const playlists = this.props.playlists
    //         this.setState({ playlists: playlists })
    //     }
    // }

    render() {
        return (
            <section className="sidebar">
                <div className="sidewrapper">
                    <div className="sidelogo">
                        <Link to='/player/browse' >
                            <img src="./assets/logo.png" alt="Moefy" />
                        </Link>
                    </div>

                    <nav className="sidebar-main-nav">
                        <Link className="sidebar-items" to='/player/browse' >
                            <div>Home</div>
                        </Link>
                        <Link className="sidebar-items" to='/player/search' >
                            <div>Search</div>
                        </Link>
                        <Link className="sidebar-items" to={`/player/user/`} >
                            <div>Library</div>
                        </Link>
                    </nav>
                    <h2 className="sidebar-playlist-header">Playlists</h2>
                    <button className="create-playlist-button" onClick>
                        
                        <span>Create Playlist</span>
                    </button>
                    <div className="sidebar-playlist-list-wrapper">
                        <ul className="sidebar-playlist-list">

                        </ul>
                    </div>
                    <div className="sidebar-bottom">
                        <Link className="sidebar-items sidebar-bottom-download" to='/player/browse' >
                            <div>Install App</div>
                        </Link>
                        <div className="user-profile">
                            <Link className="sidebar-items sidebar-bottom-download" to='/player/settings/account'>
                                {/* <div>{this.props.currentUser.username}</div> */}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Sidebar