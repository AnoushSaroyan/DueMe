import React, { Component } from "react";
import { Mutation } from "react-apollo";

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
    debugger
    let users;
    try {
      users = cache.readQuery({ query: FETCH_USERS });
    } catch (err) {
      return;
    }

    if (users) {
      let teamArray = users;
      let newTeam = data.newTeam;
      debugger
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
        // we need to make sure we update our cache once our new product is created
        update={(cache, data) => this.updateCache(cache, data)}
        // when our query is complete we'll display a success message
        onCompleted={data => {
          debugger
          const { name } = data.newTeam;
          this.setState({
            message: `New team ${name} created successfully`
          });
        }}
      >
        {(newTeam, { data }) => (
          <div>
            <h1>Create A Team</h1>
            <form onSubmit={e => this.handleSubmit(e, newTeam)} className="form-top">
              <input
                onChange={this.update("name")}
                value={this.state.name}
                placeholder="Name"
              />
              <textarea
                onChange={this.update("users")}
                value={this.state.users}
                placeholder="enter user id for now"
              />
              <button type="submit">Create Team</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateTeam;