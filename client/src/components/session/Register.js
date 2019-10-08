import React, { Component } from "react";
import "./session.scss";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../../graphql/mutations";

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
            data: { isLoggedIn: data.register.loggedIn }
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
                }}
                onError={error => this.setState({ errorMsg: error.message.split(":")[1] })}
                update={(client, data) => this.updateCache(client, data)}
            >
                {register => (
                    <div>
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
                        >
                            <input
                                value={this.state.name}
                                onChange={this.update("name")}
                                placeholder="Name"
                            />
                            <input
                                value={this.state.email}
                                onChange={this.update("email")}
                                placeholder="Email"
                            />
                            <input
                                value={this.state.password}
                                onChange={this.update("password")}
                                type="password"
                                placeholder="Password"
                            />
                            <button type="submit">Register</button>
                        </form>
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
