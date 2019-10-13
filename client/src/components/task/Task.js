import React, { Component } from 'react';
import { MdDone, MdClear, MdFormatAlignLeft } from "react-icons/md";
import './task.scss'
import { TASK, PROJECT } from '../../graphql/queries';
import { Query, Mutation, ApolloConsumer } from "react-apollo";
import TitleDetail from './TitleDetail';
import { UPDATE_TASK_STATUS, DELETE_TASK } from "../../graphql/mutations";
import TaskList from './TaskList';
import AssigneeDetail from './AssigneeDetail';
import DueDateDetail from './DueDateDetail'
import DescriptionDetail from './DescriptionDetail';

class Task extends Component{
    constructor(props){
        super(props)
        this.state = {
            taskId: this.props.taskId,
            completed: this.props.completed
        }
    }

    componentDidMount() {
        const body = document.getElementsByTagName("body")[0];
        body.addEventListener("click", (event) => {
            // let screen = document.getElementById("smoke-screen")
            // if (screen) screen.classList.remove("active")
            let addDropdown = document.getElementById("task-menu")
            if (addDropdown) addDropdown.classList.remove("active")
        })
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.taskId !== this.props.taskId){
            this.setState({
                taskId: this.props.taskId,
                completed: this.props.completed
            })
        }
        // debugger
        if (this.state.completed !== this.props.completed){
        
            this.setState({
                completed: this.props.completed
            })
        }

    }

    toggleDropMenu(button) {
        return (e) => {
            let dropDown = document.getElementById(button)
            if (dropDown) dropDown.classList.add("active")
        }
    }

    handleClose(){
        const slider = document.getElementById("task-details")
        slider.classList.remove("task-details-slide")
    }

    renderLoading() {
        return (
            <div className="la-ball-clip-rotate-multiple la-dark la-3x task-slider-load">
                <div></div>
                <div></div>
            </div>
        )
    }

    handleCompleteButton(task, updateTaskStatus){
        if (this.state.completed) {
            return <div className="add-task-button task-mark-complete noselect" onClick={e => this.handleCompleteToggle(e, task, updateTaskStatus)}><MdDone />Mark Complete</div>
        } else {
            return <div className="add-task-button task-mark-not-complete noselect" onClick={e => this.handleCompleteToggle(e, task, updateTaskStatus)}><MdDone />Mark Complete</div>
        }
    }

    handleCompleteToggle(e, task, updateTaskStatus){
        e.stopPropagation();
        updateTaskStatus({
            variables: {
                id: task._id,
                completed: !this.state.completed
            }
        }).then(()=>
                this.setState({
                    completed: !this.state.completed
                }))
    }

    render(){
        return (
        <Query query={TASK} variables={{ _id: this.state.taskId }} >
            {({ loading, error, data }) => {
                if (loading) return this.renderLoading()
                if (error) return <option>{`Error! ${error}`}</option>;
                const { task } = data
                return (
                    <div className="task-show">
                        <div className="project-show-add-task-row">
                            <Mutation
                                mutation={UPDATE_TASK_STATUS}
                                onError={err => this.setState({ message: err.message })}
                                refetchQueries={() => {
                                    return [
                                        {
                                            query: PROJECT,
                                            variables: { _id: task.project._id }
                                        }
                                    ]
                                }
                                }
                                onCompleted={data => {
                                    const { title } = data.updateTaskStatus;
                                    this.setState({
                                        message: `task ${title} update successfully!`
                                    });
                                }}
                            >
                                {(updateTaskStatus, { data }) => (
                                    this.handleCompleteButton(task, updateTaskStatus)
                                )}
                            </Mutation>
                            <div className="task-show-right">
                            <div>
                                <div className="dots noselect" onClick={this.toggleDropMenu("task-menu")}>
                                ...
                                </div>
                                <div className="profile-menu" id="task-menu">
                                    <div className="add-menu-items">
                                            <ApolloConsumer>
                                                {client => (
                                                    <Mutation
                                                        mutation={DELETE_TASK}
                                                        refetchQueries={() => {
                                                            return [
                                                                {
                                                                    query: PROJECT,
                                                                    variables: { _id: task.project._id }
                                                                }
                                                            ]
                                                        }}
                                                    >
                                                        {deleteTask => (
                                                            <div onClick={() => deleteTask( { variables: { _id: task._id } } )} className="delete-task-button">Delete Task</div>
                                                        )}
                                                    </Mutation>
                                                )}
                                            </ApolloConsumer>
                                    </div>
                                </div>
                            </div>
                            <MdClear className="task-show-close-button" onClick={this.handleClose}/>
                            </div>
                        </div>
                            <div className="task-scroll-wrapper">

                                <div>
                                    <TitleDetail task={task}/>
                                    <div className="assignee-data">
                                        <AssigneeDetail task={task}/>
                                        <DueDateDetail task={task}/>
                                    </div>
                                    <div className="task-show-description">
                                        <MdFormatAlignLeft/>
                                        <DescriptionDetail task={task}/>
                                    </div>
                                </div>

                            </div>
                    </div>
            )}}
        </Query>
        )
    }
}

export default Task