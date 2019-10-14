import React, { Component } from 'react';
import Nav from "../nav/Nav";
import { Link } from "react-router-dom";
// import { IS_LOGGED_IN } from "../../graphql/queries";
import "./splash.scss";
import Footer from '../footer/Footer'
import ReactPlayer from 'react-player'

class Splash extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: ""
        }
    }




    render(){
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
                        playing={true}
                        loop={true}
                        width="63%"
                        height="auto"
                        css={{
                            position: `absolute`,
                            top: 0,
                            left: 0,
                        }}
                    />
                </div>
                <div className="features-wrapper">
                    <div className="splash-clickable-features">
                        <div className="feature">
                            <h2>
                                Organized them
                        </h2>
                            <p>
                                Plan and structure work in a way that’s best for you and your team. Share details and assign tasks. All in one place.
                        </p>
                        </div>
                        <div className="feature">
                            <h2>
                                The power in your hands
                        </h2>
                            <p>
                                Access all teams, task and users in the easy-to-use sidebar. Hate it? no prob. You have the option to hide it.
                        </p>
                        </div>
                        <div className="feature">
                            <h2>
                                Instant messaging
                        </h2>
                            <p>
                                A team member slacking off? Spam them with emojis and get them motivated.
                        </p>
                        </div>
                </div>


                </div>
            </div>
            <Footer/>
        </div>
    );
    }
}

export default Splash;