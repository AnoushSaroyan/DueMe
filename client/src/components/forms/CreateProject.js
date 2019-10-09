import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation, ApolloConsumer, useQuery } from "react-apollo";
import MainHeader from "../main_header/MainHeader";
import "./create-team.scss";
import { CREATE_PROJECT } from "../../graphql/mutations";
import { FETCH_USERS, FIND_USER_BY_EMAIL, USER } from "../../graphql/queries";
import "./create-project.scss"
import CreateProjectPopup from './CreateProjectPopup'

class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      dueDate: "",
      team: "",
      color: "red"
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  // updateCache(cache, { data }) {
  //   let user;
  //   try {
  //     user = cache.readQuery({ query: USER, variables: { _id: localStorage.getItem("currentUserId") } });
  //   } catch (err) {
  //     return;
  //   }

  //   if (user) {
  //     let teamArray = user.teams;
  //     let newProject = data.newProject;
  //     teamArray.forEach(team => {
  //       if (team._id === newProject.team._id) {
  //         team.push(newProject)
  //       }
  //     })
  //     cache.writeQuery({
  //       query: USER,
  //       data: { user: {teams: teamArray} }
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
        color: this.state.color
      }
    });
  }

  constructTeamSelection(){
    const { loading, error, data } = useQuery(USER, {variables: { _id: localStorage.getItem("currentUserId") }})
    if (loading) return null;
    if (error) return <option>{`Error! ${error}`}</option>;
    const { user } = data
    let teams = []
    teams = user.teams
    if (teams.length === 0) {
      return <CreateProjectPopup thing={"Team"} />
    }
    if (teams.length > 0 && teams[0] && !this.state.team) this.setState({ team: teams[0]._id})
    let teamsOptions
    teamsOptions = teams.map(team => <option key={team._id} value={team._id}>{team.name}</option>)



    return (
      <div className="create-project-team">
        <h3>Team</h3>
        {/* <input
                        onChange={this.update("team")}
                        value={this.state.team}
                        placeholder="Team objectID for now"
                        className="form-input"
                      /> */}
        <select name="team" value={this.state.team} onChange={this.update("team")}>
          {teamsOptions}
        </select>
      </div>
    )
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_PROJECT}
        // if we error out we can set the message here
        onError={err => this.setState({ message: err.message })}
        // update={(cache, data) => this.updateCache(cache, data)}
        refetchQueries={() => {
          return [
            {
              query: USER,
              variables: { _id: localStorage.getItem("currentUserId") }
            } 
          ]
        }
        }
        // we need to make sure we update our cache once our new project is created
        // update={(cache, data) => {
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
            <MainHeader page={"New Project"} />
            <div className="scroll-wrapper">
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
                {this.constructTeamSelection()}
                <div  className="create-project-color">
                  <h3>Color</h3>
                  <div className="create-project-color-wrapper">
                    <label className="container"><input name="radio" id="red" type="radio" value="red" onChange={this.update("color")}/><span className="checkmark" style={ {backgroundColor: "red", border: "red 1px solid" }}/></label>
                    <label className="container"><input name="radio" id="red" type="radio" value="orange" onChange={this.update("color")} /><span className="checkmark" style={{ backgroundColor: "orange", border: "orange 1px solid" }}/></label>
                    <label className="container"><input name="radio" id="red" type="radio" value="green" onChange={this.update("color")} /><span className="checkmark" style={{ backgroundColor: "green", border: "green 1px solid" }}/></label>
                    <label className="container"><input name="radio" id="red" type="radio" value="blue" onChange={this.update("color")} /><span className="checkmark" style={{ backgroundColor: "blue", border: "blue 1px solid" }}/></label>
                    <label className="container"><input name="radio" id="red" type="radio" value="indigo" onChange={this.update("color")} /><span className="checkmark" style={{ backgroundColor: "indigo", border: "indigo 1px solid" }}/></label>
                    <label className="container"><input name="radio" id="red" type="radio" value="violet" onChange={this.update("color")} /><span className="checkmark" style={{ backgroundColor: "violet", border: "violet 1px solid" }}/></label>
                  </div>
                </div>

                <div className="form-buttons">
                  <button type="cancel"><Link to="/home">Cancel</Link></button>
                  <button type="submit">Create Project</button>
                </div>
              </form>
              <p className="success-message">{this.state.message}</p>
            </div>
          </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(CreateProject);