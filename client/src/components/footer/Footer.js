import React from 'react';
<<<<<<< HEAD
import { withRouter } from 'react-router-dom';
=======
import { withRouter, Link } from 'react-router-dom';
>>>>>>> please
import "./footer.scss";

class Footer extends React.Component {

    goToTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    render() {
        return (
            <div className="footer1">
                <div className="footer-links-groups">
                    <a href={`#${this.props.history.location.pathname}`} onClick={this.goToTop}><img src="images/icon.png" className="footer-logo" alt="dueme" /></a>
                    <div className="footer-group">
                        <div>About Us</div>
                        <ul>
                            <li><a href="https://github.com/AbbyTunes">Abby</a></li>
                            <li><a href="https://github.com/AnoushSaroyan">Anoush Saroyan</a></li>
                            <li><a href="https://github.com/tbbennett1">Brock Bennett</a></li>
                            <li><a href="https://github.com/catly1">Carlos Catly</a></li>
                        </ul>
                    </div>
                    <div className="footer-group">
                        <div>Other Services</div>
                        <ul>
                            <li><a href="https://moefy.herokuapp.com/">Moefy</a></li>
                        </ul>
                    </div>

                    <div className="footer-group">
                        <div>Technologies</div>
                        <ul>
                            <li><a href="https://expressjs.com">Express</a></li>
                            <li><a href="https://reactjs.org/">React</a></li>
                            <li><a href="https://www.mongodb.com">mongoDB</a></li>
                            <li><a href="https://graphql.org/">GraphQL</a></li>
                            <li><a href="https://www.apollographql.com">Apollo</a></li>
                        </ul>
                    </div>

                    <div className="footer-group">
                        <div>Resources</div>
                        <ul>
                            <li><a href="https://www.appacademy.io/">App Academy</a></li>
                            <li><a href="https://asana.com">Asana</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Footer);