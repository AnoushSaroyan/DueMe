import React from "react";
import "./nav.scss";
import { Link } from "react-router-dom";
import { IS_LOGGED_IN } from "../../graphql/queries";
import { Query, ApolloConsumer } from 'react-apollo';
import {withRouter} from 'react-router-dom';

const Nav = props => {
    return (
        <ApolloConsumer>
            {
             client => (
                 <Query query={IS_LOGGED_IN}>
                     {({ data }) => {
                         if (data.isLoggedIn) {
                             return <button
                                 onClick={e => {
                                     e.preventDefault();
                                     localStorage.removeItem('auth-token');
                                     client.writeData({ data: { isLoggedIn: false } });
                                     props.history.push("/");
                                 }}>Logout</button>
                         } else {
                             return (
                                 <div className="main-nav">
                                     <div className="left-nav">
                                         <img src="images/logo.png" className="logo" alt="dueme" />
                                         <Link to="/">DueMe</Link>
                                     </div>                                    
                                     <div className="right-nav">
                                        <Link to="/login" className="login-btn">Log In</Link>
                                        <Link to="/register" className="signup-btn">Try for free</Link>
                                     </div>
                                 </div>
                             );
                         }
                     }}
                 </Query>
             )   
            }
        </ApolloConsumer>
    );
};

export default withRouter(Nav);