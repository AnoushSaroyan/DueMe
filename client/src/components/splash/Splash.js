import React from "react";
import Nav from "../nav/Nav";
import { Link } from "react-router-dom";
import "./splash.scss";
import Footer from '../footer/Footer'
import ReactPlayer from 'react-player'

const Splash = props => {
    return (
        <div className="splash">
            <Nav />
            <div className="greeting-container">
                <div className="greeting-text-wrapper">
                    <h4>The way you think isn’t working</h4>
                    <p>Ditch the chaos of endless email, sprawling spreadsheets, and not-so-sticky notes. DueMe is all you need to manage work—without the anxiety.</p>
                <div className="splash-signup-div">
                </div>
                    <Link to="/register" className="splash-signup-btn">Try for free</Link>
                </div>
                <div className="splash-video">
                    <ReactPlayer 
                        url="/videos/splash-video.mp4"
                        playing="true"
                        loop="true"
                        width="63%"
                        height="auto"
                        css={{
                            position: `absolute`,
                            top: 0,
                            left: 0,
                        }}
                    />
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Splash;