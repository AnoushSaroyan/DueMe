import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import MainHeader from "../main_header/MainHeader";
import "./create-task.scss";
import { useQuery } from "react-apollo";
import { CREATE_TASK } from "../../graphql/mutations";
import { USER } from "../../graphql/queries";
import { PROJECT } from "../../graphql/queries";
import { FaSquare } from "react-icons/fa";
import CreateProjectPopup from '../forms/CreateProjectPopup'

class CreateTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
	  description: "",
	  dueDate: "",
	  completed: false,
    project: "",
    user: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.project !== this.state.project){
      this.setState({
        user: ""
      })
    }
    
  }

  constructProjectSelection(){
    const { loading, error, data } = useQuery(USER, { variables: { _id: localStorage.getItem("currentUserId") } })
    if (loading) return null;
    if (error) return <option>{`Error! ${error}`}</option>;
    const { user } = data
    const projects = []
    user.teams.forEach(team => team.projects.forEach(project => projects.push(project)))
    if (projects.length > 0 && projects[0] && !this.state.project) this.setState({ project: projects[0]._id })
    
    if (projects.length === 0){
      return <CreateProjectPopup thing={"Project"} />
    }
    
    let projectOptions
    projectOptions = projects.map(project => {
      let color
      project.color ? color = project.color : color = "#e362e3"

      let projectColor = {
        backgroundColor: color
      }
      return <option key={project._id} value={project._id}>{project.name}</option>
    })

    return(
      <div className="create-project-team create-task">
        <h3>Project</h3>
        <select name="project" value={this.state.project} onChange={this.update("project")} className="form-input team">
          {projectOptions}
        </select>
      </div>
    )
  }

  constructUserSelection(){
    const { loading, error, data } = useQuery(USER, { variables: { _id: localStorage.getItem("currentUserId") } })
    if (loading) return null;
    if (error) return <option>{`Error! ${error}`}</option>;
    const { user } = data
    let team = user.teams.find(team => team.projects.find(project => {
      if (project._id == this.state.project) {
        return project
      }
    }))
    if (!team) return null
    let users = []
    users = team.users
    if (users.length > 0 && users[0] && !this.state.user) this.setState({ user:users[0]._id })

    let userOptions
    userOptions = users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)
    return (
      <div className="create-project-team create-task">
        <h3>User</h3>
        <select name="user" value={this.state.user} onChange={this.update("user")} className="form-input team">
          {userOptions}
        </select>
      </div>
    )
  }

  handleSubmit(e, newTask) {
	e.preventDefault();
    newTask({
      variables: {
		description: this.state.description,
		dueDate: this.state.dueDate,
		completed: this.state.completed,
		user: this.state.user,
		project: this.state.project,
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_TASK}
        // if we error out we can set the message here
        onError={err => this.setState({ message: err.message })}
        refetchQueries={() => {
          return [
            {
              query: USER,
              variables: { _id: localStorage.getItem("currentUserId") }
            }
          ]
        }}
        // we need to make sure we update our cache once a new task is created
        // update={(cache, data) => {
        //   this.updateCache(cache, data)}}
        // when our query is complete we'll display a success message
        onCompleted={data => {
          const { description } = data.newTask;
          this.setState({
			  message: `New task ${description} created successfully!`
          });
          this.props.history.push('/');
        }}
      >
        {(newTask, { data }) => (
          <div>
            <MainHeader page={"New Task"} />
            <div className="form-top">
              <h1>Create New Task</h1>
              <form onSubmit={e => this.handleSubmit(e, newTask)} className="form-inner">
                
				<h3>Task Description</h3>
                <input
                  onChange={this.update("description")}
				  value={this.state.description}
                  placeholder='task description'
                  className="form-input"
                />

				<h3>Due Date</h3>
				<input
					onChange={this.update("dueDate")}
					value={this.state.dueDate}
          className="form-input"
          type="date"
				/>

                {/* <h3>Project</h3>
                <input
                  onChange={this.update("project")}
                  value={this.state.project}
                  placeholder="Enter project id"
                  className="form-input"
                /> */}
                {this.constructProjectSelection()}
                {this.constructUserSelection()}
				{/* <h3>Users</h3>
				<input
					onChange={this.update("user")}
					value={this.state.user}
					placeholder="Enter user id for now"
					className="form-input"
				/> */}
                <div className="form-buttons">
                  <button type="cancel"><Link to="/task">Cancel</Link></button>
                  <button type="submit">Create Task</button>
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

export default withRouter(CreateTask);