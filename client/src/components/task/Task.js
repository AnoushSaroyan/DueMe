import React, { Component } from 'react';
import { MdDone, MdClear } from "react-icons/md";
import './task.scss'
import { TASK, PROJECT } from '../../graphql/queries';
import { Query } from "react-apollo";
import TitleDetail from './TitleDetail';
import { Mutation } from "react-apollo";
import { UPDATE_TASK_STATUS } from "../../graphql/mutations";
import TaskList from './TaskList';
import AssigneeDetail from './AssigneeDetail';
import DueDateDetail from './DueDateDetail'

class Task extends Component{
    constructor(props){
        super(props)
        this.state = {
            taskId: this.props.taskId,
            completed: this.props.completed
        }
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
                            <MdClear className="task-show-close-button" onClick={this.handleClose}/>
                        </div>
                            <div className="task-scroll-wrapper">

                                <div>
                                    <TitleDetail task={task}/>
                                    <div className="assignee-data">
                                    <AssigneeDetail task={task}/>
                                    <DueDateDetail task={task}/>
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