import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import MainHeader from "../main_header/MainHeader";
import "./create-task.scss";

import { CREATE_TASK } from "../../graphql/mutations";
import { USER } from "../../graphql/queries";
import { PROJECT } from "../../graphql/queries";


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

//   updateCache(cache, { data }) {
//     let users;
//     try {
//       users = cache.readQuery({ query: USER });
//     } catch (err) {
//       return;
//     }

//     if (users) {
// 	  let taskUser = users;
//       let newTask = data.newTask;
//       cache.writeQuery({
//         query: USER,
//         data: { users: taskUser.concat(newTask) }
//       });
// 	}

// 	let projects;
// 	try {
// 		projects = cache.readQuery({ query: PROJECT });
// 	} catch (err) {
// 		return;
// 	}
	
// 	if (projects) {
// 		let taskProject = projects;
// 		let newTask = data.newTask;
// 		cache.writeQuery({
// 			query: PROJECT,
// 			data: { projects: taskProject.concat(newTask) }
// 		});
// 	}
//   }

  handleSubmit(e, newTask) {
	e.preventDefault();
	debugger;
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
					placeholder="MM-DD-YYYY"
					className="form-input"
				/>

                <h3>Project</h3>
                <input
                  onChange={this.update("project")}
                  value={this.state.project}
                  placeholder="Enter project id"
                  className="form-input"
                />
				<h3>Users</h3>
				<input
					onChange={this.update("user")}
					value={this.state.user}
					placeholder="Enter user id for now"
					className="form-input"
				/>
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