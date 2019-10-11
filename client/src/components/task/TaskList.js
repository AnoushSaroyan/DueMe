import React, { Component } from 'react';
import MainHeader from '../main_header/MainHeader';
import { useQuery, Query } from "react-apollo";
import { USER, PROJECT } from '../../graphql/queries';
import '../project/project.scss';
import TaskRow from './TaskRow';
import { MdPersonOutline, mdAdd } from "react-icons/md";
// import ReactPlayer from 'react-player'

class TaskList extends Component {
	constructor(props) {
		super(props)
		if (this.props.type === "own"){
			this.state = {
				userId: localStorage.getItem("currentUserId") 
			}
		} else {
		this.state = {
			userId: this.props.match.params.id
		}}
	}

	// componentDidMount(){
	//     this.setState({
	//         userID: 
	//     })
	// }

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.id !== this.props.match.params.id && !this.props.type) {
			debugger
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



					// let foundProject = project
					// const team = teams.find(team => team.projects.find(project => {if(project._id == this.state.projectId){
					//     foundProject = project
					//     return project
					// }}))
					tasks = tasks.map(task => <TaskRow task={task} key={task._id} type={"user"} projectId={task.project._id} userId={user._id}/>)
					
					return (
						<div>
							<MainHeader page={user.name} color={user.color} type={"user"} />
							<div className="scroll-wrapper">
								<div className="project-show">
									<div className="project-show-wrapper">
										<div className="project-show-spreadsheet">
											<div className="project-show-add-task-row">
												<div className="add-task-button">Add Task</div>
											</div>
											{tasks}
										</div>
										<div className="project-show-task-details">

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