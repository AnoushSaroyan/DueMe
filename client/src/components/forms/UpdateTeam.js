import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation, useQuery } from "react-apollo";
import MainHeader from "../main_header/MainHeader";
import "./create-team.scss";

import { CREATE_TEAM, ADD_USER_TO_TEAM } from "../../graphql/mutations";
import { FETCH_USERS, FIND_USER_BY_EMAIL, USER } from "../../graphql/queries";


class UpdateTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            projects: "",
            user: ""
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    // updateCache(cache, { data }) {
    //   let users;
    //   try {
    //     users = cache.readQuery({ query: FETCH_USERS });
    //   } catch (err) {
    //     return;
    //   }

    //   if (users) {
    //     let teamArray = users;
    //     let addUserToTeam = data.addUserToTeam;
    //     cache.writeQuery({
    //       query: FETCH_USERS,
    //       data: { users: teamArray.concat(addUserToTeam) }
    //     });
    //   }
    // }

    handleSubmit(e, addUserToTeam) {
        e.preventDefault();
        debugger
        addUserToTeam({
            variables: {
                _id: this.props.match.params.id,
                userId: this.state.user
            }
        });
    }

    constructUserSelection() {
        const { loading, error, data } = useQuery(FETCH_USERS)
        if (loading) return null;
        if (error) return <option>{`Error! ${error}`}</option>;
        const { users } = data

        if (users.length > 0 && users[0] && !this.state.user) this.setState({ user: users[0]._id })

        let userOptions
        userOptions = users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)
        return (
            <div className="create-project-team create-task">
                <h3>Member</h3>
                <select name="user" value={this.state.user} onChange={this.update("user")} className="form-input team">
                    {userOptions}
                </select>
            </div>
        )
    }

    render() {
        return (
            <Mutation
                mutation={ADD_USER_TO_TEAM}
                // if we error out we can set the message here
                onError={err => this.setState({ message: err.message })}
                // we need to make sure we update our cache once our new team is created
                // update={(cache, data) => {
                //   this.updateCache(cache, data)}}
                refetchQueries={() => {
                    return [
                        {
                            query: USER,
                            variables: { _id: localStorage.getItem("currentUserId") }
                        }
                    ]
                }
                }
                // when our query is complete we'll display a success message
                onCompleted={data => {
                    this.props.history.push(`/main/team/${data.addUserToTeam._id}`);
                }}
            >
                {(addUserToTeam, { data }) => (
                    <div>
                        <MainHeader page={"Add Member"} />
                        <div className="form-top">
                            <h1>Update Team</h1>
                            <form onSubmit={e => this.handleSubmit(e, addUserToTeam)} className="form-inner">
                                {this.constructUserSelection()}
                                <div className="form-buttons">
                                    <button type="cancel"><Link to="/home">Cancel</Link></button>
                                    <button type="submit">Add Member</button>
                                </div>
                            </form>
                            <p className="success-message">{this.state.message}</p>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default withRouter(UpdateTeam);