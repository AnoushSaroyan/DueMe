import React from 'react';
import { withRouter, Link } from 'react-router-dom';
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
                    <a href={`#${this.props.history.location.pathname}`} onClick={this.goToTop}><img src="images/logo.png" className="footer-logo" alt="dueme" /></a>
                    <div className="footer-group">
                        <div>Get to Know Us</div>
                        <ul>
                            <li><a href="https://github.com/AbbyTunes">Abby</a></li>
                            <li><a href="https://github.com/AnoushSaroyan">Anoush Saroyan</a></li>
                            <li><a href="https://github.com/tbbennett1">Brock Bennett</a></li>
                            <li><a href="https://github.com/catly1">Carlos Catly</a></li>
                        </ul>
                    </div>
                    <div className="footer-group">
                        <div>Make Money with Us</div>
                        <ul>
                            <li><Link to="/new_item">Sell Your Pet</Link></li>
                            <li><Link to="/new_item">Sell Your Product</Link></li>
                        </ul>
                    </div>

                    <div className="footer-group">
                        <div>Let Us help You</div>
                        <ul>
                            <li><Link to={`/users/${this.props.userId}`}>Your Account</Link></li>
                            <li><Link to="/cart">Your Cart</Link></li>
                            <li><a href="">Help</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Footer);