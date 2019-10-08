import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import MainHeader from "../main_header/MainHeader";
import "./create-team.scss";

import { CREATE_PROJECT } from "../../graphql/mutations";
import { FETCH_USERS, FIND_USER_BY_EMAIL } from "../../graphql/queries";


class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      dueDate: "",
      team: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  // updateCache(cache, { data }) {
  //   let users;
  //   debugger
  //   try {
  //     users = cache.readQuery({ query: FETCH_USERS });
  //   } catch (err) {
  //     return;
  //   }

  //   if (users) {
  //     let teamArray = users;
  //     let newTeam = data.newTeam;
  //     cache.writeQuery({
  //       query: FETCH_USERS,
  //       data: { users: teamArray.concat(newTeam) }
  //     });
  //   }
  // }

  handleSubmit(e, newProject) {
    e.preventDefault();
    newProject({
      variables: {
        name: this.state.name,
        description: this.state.description,
        dueDate: this.state.dueDate,
        team: this.state.team,
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_PROJECT}
        // if we error out we can set the message here
        onError={err => this.setState({ message: err.message })}

        // we need to make sure we update our cache once our new project is created
        // update={(cache, data) => {
        //   debugger
        //   this.updateCache(cache, data)
        // }}
        // when our query is complete we'll display a success message
        onCompleted={data => {
          const { name } = data.newProject;
          this.setState({
            message: `New project ${name} created successfully!`
          });
          this.props.history.push('/');
        }}
      >
        {(newProject, { data }) => (
          <div>
            <MainHeader page={"Home"} />
            <div className="form-top">
              <h1>Add Project Details</h1>
              <form onSubmit={e => this.handleSubmit(e, newProject)} className="form-inner">
                <h3>Project Name</h3>
                <input
                  onChange={this.update("name")}
                  value={this.state.name}
                  placeholder='Awesome Project Name'
                  className="form-input"
                />
                <h3>Description</h3>
                <input
                  onChange={this.update("description")}
                  value={this.state.description}
                  placeholder="Please include a project description"
                  className="form-input"
                />
                <h3>Due Date</h3>
                <input
                  onChange={this.update("dueDate")}
                  value={this.state.dueDate}
                  placeholder="MM-DD-YYYY"
                  className="form-input"
                />
                <h3>Team</h3>
                <input
                  onChange={this.update("team")}
                  value={this.state.team}
                  placeholder="Team objectID for now"
                  className="form-input"
                />
                <div className="form-buttons">
                  <button type="cancel"><Link to="/home">Cancel</Link></button>
                  <button type="submit">Create Project</button>
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

export default withRouter(CreateProject);