import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import MainHeader from "../main_header/MainHeader";
import "./create-team.scss";

import { CREATE_TEAM } from "../../graphql/mutations";
import { FETCH_USERS } from "../../graphql/queries";


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
    try {
      users = cache.readQuery({ query: FETCH_USERS });
    } catch (err) {
      return;
    }

    if (users) {
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
    newTeam({
      variables: {
        name: this.state.name,
        users: this.state.users
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
            message: `New team ${name} created successfully`
          });
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
                  placeholder="Enter user ids for now. Comma separated-No spaces"
                  className="form-input"
                />
                <Link to="/home"><button type="cancel">Cancel</button></Link>
                <button type="submit">Create Team</button>
              </form>
              <p>{this.state.message}</p>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateTeam;