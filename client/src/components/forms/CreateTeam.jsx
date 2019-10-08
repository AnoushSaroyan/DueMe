import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import MainHeader from "../main_header/MainHeader";
import "./create-team.scss";

import { CREATE_TEAM } from "../../graphql/mutations";
import { FETCH_USERS, FIND_USER_BY_EMAIL } from "../../graphql/queries";


class CreateTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      projects: [],
      users: []
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, { data }) {
    let users;
    debugger
    try {
      users = cache.readQuery({ query: FETCH_USERS });
    } catch (err) {
      return;
    }

    if (users) {
      debugger
      let teamArray = users;
      let newTeam = data.newTeam;
      cache.writeQuery({
        query: FETCH_USERS,
        data: { users: teamArray.concat(newTeam) }
      });
    }
  }

  handleSubmit(e, newTeam) {
    e.preventDefault();
    debugger
    newTeam({
      variables: {
        name: this.state.name,
        users: this.state.users.split(', ')
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_TEAM}
        // if we error out we can set the message here
        onError={err => this.setState({ message: err.message })}
        // we need to make sure we update our cache once our new team is created
        update={(cache, data) => {
          this.updateCache(cache, data)}}
        // when our query is complete we'll display a success message
        onCompleted={data => {
          const { name } = data.newTeam;
          this.setState({
            message: `New team ${name} created successfully!`
          });
          this.props.history.push('/');
        }}
      >
        {(newTeam, { data }) => (
          <div>
            <MainHeader page={"Home"} />
            <div className="form-top">
              <h1>Create New Team</h1>
              <form onSubmit={e => this.handleSubmit(e, newTeam)} className="form-inner">
                <h3>Team Name</h3>
                <input
                  onChange={this.update("name")}
                  value={this.state.name}
                  placeholder='For example: "Design" or "Development"'
                  className="form-input"
                />
                <h3>Members</h3>
                <input
                  onChange={this.update("users")}
                  value={this.state.users}
                  placeholder="name@email.com, name2@email2.com, ..."
                  className="form-input"
                />
                <div className="form-buttons">
                  <button type="cancel"><Link to="/home">Cancel</Link></button>
                  <button type="submit">Create Team</button>
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

export default withRouter(CreateTeam);