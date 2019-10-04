import React from "react";
import Nav from "../nav/Nav";
import { Link } from "react-router-dom";
import "./splash.scss";

const Splash = props => {
    return (
        <div className="splash">
            <Nav />
            <div className="greeting-container">
                <div className="greeting-text-wrapper">
                    <h4>The way you work isn’t working</h4>
                    <p>Ditch the chaos of endless email, sprawling spreadsheets, and not-so-sticky notes. Asana is all you need to manage work—without the anxiety.</p>
                </div>
                <div className="splash-signup-div">
                    <Link to="/register" className="splash-signup-btn">Try for free</Link>
                </div>
                <div className="splash-video">
                    
                </div>
            </div>
        </div>
    );
}

export default Splash;