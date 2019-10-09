import React, { Component } from "react";
import "./session.scss";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../../graphql/mutations";
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            errorMsg: ""
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    // update the cache to let it know this user is loggedIn!
    updateCache(client, { data }) {
        client.writeData({
            data: { isLoggedIn: data.register.loggedIn}
        });
    }

    render() {
        return (
            <Mutation
                mutation={REGISTER_USER}
                onCompleted={data => {
                    console.log(data);
                    const { token } = data.register;
                    localStorage.setItem("auth-token", token);
                    localStorage.setItem("currentUserId", data.register._id)
                }}
                onError={error => this.setState({ errorMsg: error.message.split(":")[1] })}
                update={(client, data) => this.updateCache(client, data)}
            >
                {register => (
                    <div className="session">
                <img src="images/dueme logo.png" class="session-logo" alt="dueme" />
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                register({
                                    variables: {
                                        email: this.state.email,
                                        password: this.state.password,
                                        name: this.state.name
                                    }
                                });
                            }}
                            className="form-top-session"
                        >
                            <h1>Start your free trial</h1>
                            <div className="form-inner">
                              <h3>Name</h3>
                              <input
                                  value={this.state.name}
                                  onChange={this.update("name")}
                                  placeholder="username"
                                  className="form-input"
                              />
                              <h3>Email</h3>
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
                                <button type="submit">Sign Up</button>
                              </div>
                            </div>
                        </form>
                        <div className="session-info">
                          <span>Already have an account?</span>
                          <Link to="/login">Log In</Link>
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

export default Register;
