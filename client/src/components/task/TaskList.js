import React, { Component } from 'react';
import MainHeader from '../main_header/MainHeader';
import { useQuery, Query, Mutation } from "react-apollo";
import { USER, PROJECT } from '../../graphql/queries';
import '../project/project.scss';
import TaskRow from './TaskRow';
import { MdPersonOutline, mdAdd } from "react-icons/md";
import Task from './Task';
import { CREATE_TASK } from "../../graphql/mutations";
import { Link } from 'react-router-dom';
// import ReactPlayer from 'react-player'

class TaskList extends Component {
	constructor(props) {
		super(props)
		if (this.props.type === "own"){
			this.state = {
				userId: localStorage.getItem("currentUserId"),
				openedTask: "",
				taskStatus: ""
			}
		} else {
		this.state = {
			userId: this.props.match.params.id,
			openedTask: "",
			taskStatus: ""
		}}
		this.handleSlide = this.handleSlide.bind(this)
	}

	// componentDidMount(){
	//     this.setState({
	//         userID: 
	//     })
	// }

	componentDidUpdate(prevProps, prevState) {
		if (!this.props.type && prevProps.match.params.id !== this.props.match.params.id) {
			this.setState({
				userId: this.props.match.params.id
			})
		}
	}

	renderLoading(){
		return (
			<div className="la-ball-clip-rotate-multiple la-dark la-3x main-page-load">
				<div></div>
				<div></div>
			</div>
		)
	}

	handleSlide(e){
		const slider = document.getElementById("task-details")
		let bool = e.currentTarget.getAttribute("value")
		if (bool === "true") {
			bool = true
		} else {
			bool = false
		}
		this.setState({
			openedTask: e.currentTarget.id,
			taskStatus: bool
		})
		slider.classList.add("task-details-slide")
	}

	addTaskButton() {
		return (
			<Mutation
				mutation={CREATE_TASK}
				// if we error out we can set the message here
				onError={err => this.setState({ message: err.message })}
				refetchQueries={() => {
					return [
						{
							query: PROJECT,
							variables: { _id: this.state.projectId }
						},
						{
							query: USER,
							variables: { _id: localStorage.getItem("currentUserId") }
						},
					]
				}}
			// we need to make sure we update our cache once a new task is created
			// update={(cache, data) => {
			//   this.updateCache(cache, data)}}
			// when our query is complete we'll display a success message
			>
				{(newTask, { data }) => (
					<div className="add-task-button" onClick={() => this.handleAddTask(newTask)}>Add Task</div>
				)}
			</Mutation>
		)
	}

	handleAddTask(newTask) {
		debugger
		newTask({
			variables: {
				title: "new task",
				description: "",
				dueDate: "",
				completed: false,
				user: this.state.userId,
				project: "",
			}
		});
	}

	render() {
		if (!localStorage.getItem("currentUserId")) {
			return <div></div>
		}

		return (
			<Query query={USER} variables={{ _id: this.state.userId }}>
				{({ loading, error, data }) => {
					if (loading) return this.renderLoading()
					if (error) return <option>{`Error! ${error}`}</option>;
					const { user } = data
					const projects = []
					let tasks = []
					user.teams.forEach(team => {
						if (team.projects.length > 0) {
						team.projects.forEach(project => { 
							if (project.tasks.length > 0) {
								project.tasks.forEach(task => {
									if (task.user._id === user._id )tasks.push(task)})}})}})

					let foundTask
					if (this.state.openedTask) {
						foundTask = tasks.find(task => task._id === this.state.openedTask)
						if (foundTask && foundTask.completed !== this.state.taskStatus) {
							this.setState({
								taskStatus: foundTask.completed
							})
						}
					}
					// let foundProject = project
					// const team = teams.find(team => team.projects.find(project => {if(project._id == this.state.projectId){
					//     foundProject = project
					//     return project
					// }}))
					tasks = tasks.map(task => <div key={task._id} onClick={this.handleSlide} id={task._id} value={task.completed}><TaskRow task={task} type={"user"} projectId={task.project._id} userId={user._id} /></div>)
					
					return (
						<div>
							<MainHeader page={user.name} color={user.color} type={"user"} />
							<div className="scroll-wrapper">
								<div className="project-show">
									<div className="project-show-wrapper">
										<div className="project-show-spreadsheet test-left">
											<div className="project-show-add-task-row">
												{/* {this.addTaskButton()} */}
												<Link to="/main/task/new" className="add-task-button" >Add Task</Link>
											</div>
											{tasks}
										</div>
										<div className="project-show-task-details" id="task-details">
											<Task taskId={this.state.openedTask} completed={this.state.taskStatus}/>
										</div>
									</div>
								</div>
							</div>
						</div>)
				}}
			</Query>
		)
	}
}

export default TaskList