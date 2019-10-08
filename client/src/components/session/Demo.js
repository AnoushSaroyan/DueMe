import React from 'react';
import "./session.scss";
import { LOGIN_USER } from '../../graphql/mutations';
import { Mutation } from 'react-apollo';

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "guest@guest.com",
            password: "hunter2"
        }
    }

    // update(field) {
    //     return event => {
    //         this.setState({ [field]: event.target.value });
    //     }
    // }

    updateCache(cache, { data }) {
        console.log(data);
        cache.writeData({
            data: { isLoggedIn: data.login.loggedIn }
        })
    }

    render() {
        return (
            <Mutation
                mutation={LOGIN_USER}
                onCompleted={data => {
                    const { token } = data.login;
                    localStorage.setItem("auth-token", token);
                    this.props.history.push("/");
                }}
                onError={error => this.setState({ errorMsg: error.message.split(":")[1] })}
                update={(cache, data) => this.updateCache(cache, data)}
            >
                {login => (
                    <div>
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
                        >
                            {/* <input
                                value={this.state.email}
                                onChange={this.update("email")}
                                placeholder="Email"
                            />
                            <input
                                value={this.state.password}
                                onChange={this.update("password")}
                                type="password"
                                placeholder="Password"
                            /> */}
                            <button type="submit">Demo</button>
                        </form>
                        {/* <div className="error-msg">
                            <p>{this.state.errorMsg}</p>
                        </div> */}
                    </div>
                )}
            </Mutation>
        );
    }
}

export default Demo;