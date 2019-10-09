import React from 'react';
import "./session.scss";
import "../forms/create-team.scss"
import { LOGIN_USER } from '../../graphql/mutations';
import { USER } from "../../graphql/queries";
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import Register from './Register';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMsg: ""
        }
    }

    update(field){
        return event => {
            this.setState({[field]: event.target.value});
        }
    }

    updateCache(cache, { data }){
        console.log(data);
        cache.writeData({
            data: { isLoggedIn: data.login.loggedIn}
        })
    }

    render() {
        return (
            <Mutation
                mutation={LOGIN_USER}
                refetchQueries={() => {
                    return [
                        {
                            query: USER,
                            variables: { _id: localStorage.getItem("currentUserId") }
                        }
                    ]
                }}
                onCompleted={data => {
                    const { token } = data.login;
                    localStorage.setItem("auth-token", token);
                    localStorage.setItem("currentUserId", data.login._id)
                    this.props.history.push("/");
                }}
                onError={error => this.setState({ errorMsg: error.message.split(":")[1] })}
                update={(cache, data) => this.updateCache(cache, data)}
            >
                {(login, { data }) => (
                    <div className="session">
                        <img src="images/dueme logo.png" class="session-logo" alt="dueme" />
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                login({
                                    variables: {
                                        email: this.state.email,
                                        password: this.state.password
                                    }
                                });
                            }}
                            className="form-top-session"
                        >
                            <h1>Log in</h1>                            
                            <div className="form-inner">
                              <h3>Email Address</h3>
                              <input
                                  value={this.state.email}
                                  onChange={this.update("email")}
                                  placeholder="name@email.com"
                                  className="form-input"
                              />                            
                              <h3>Password</h3>
                              <input
                                  value={this.state.password}
                                  onChange={this.update("password")}
                                  type="password"
                                  placeholder="password"
                                  className="form-input"
                              />                              
                              <div className="form-buttons">
                                <button type="submit">Log In</button>
                              </div>
                            </div>
                        </form>
                        <div className="session-info"> 
                          <span>Don't have an account?</span>
                          <Link to="/register">Sign Up</Link>
                        </div>
                        <div className="error-msg">
                            <p>{this.state.errorMsg}</p>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default Login;