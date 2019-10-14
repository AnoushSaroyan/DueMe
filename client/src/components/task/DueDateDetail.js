import React, { Component } from 'react';
import { UPDATE_TASK_DUEDATE } from '../../graphql/mutations';
import { Mutation } from "react-apollo";
import './task.scss';
import { FiCalendar } from "react-icons/fi";
import { USER, PROJECT } from '../../graphql/queries';

class DueDateDetail extends Component{
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            task: this.props.task || "",
            dueDate: this.props.task.dueDate
        }

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(e) {
        e.preventDefault();
        this.setState({ editing: true });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.task._id !== prevProps.task._id) {
            this.setState({
                dueDate: this.props.task.dueDate,
                task: this.props.task
            })
        }
    }

    fieldUpdate(field) {
        return e => this.setState({ [field]: e.target.value })
    }

    render() {
        const { task } = this.state


        if (this.state.editing) {
            return (
                <Mutation 
                mutation={UPDATE_TASK_DUEDATE}
                refetchQueries={() => {
                    return [
                        {
                            query: PROJECT,
                            variables: { _id: this.state.task.project._id }
                        },
                        {
                            query: USER,
                            variables: { _id: localStorage.getItem("currentUserId") }
                        },
                    ]
                }}
                >
                    {(updateTaskDueDate, data) => (
                        <div className="task-show-user">
                            <div className="main-header-avatar-pic task-calendar">
                                <FiCalendar />
                            </div>
                            <div className="assignee-details">
                                <div>
                                    Due Date
                                </div>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        updateTaskDueDate({
                                            variables: { id: this.props.task._id, dueDate: this.state.dueDate }
                                        }).then(() => this.setState({ editing: false }));
                                    }}
                                >
                                    <input
                                        type="date"
                                        value={this.state.dueDate}
                                        onChange={this.fieldUpdate("dueDate")}
                                        onBlur={e => {
                                            e.preventDefault();
                                            updateTaskDueDate({
                                                variables: { id: this.props.task._id, dueDate: this.state.dueDate }
                                            }).then(() => this.setState({ editing: false }));
                                        }}
                                    />
                                    {/* <button type="submit">Update title</button> */}
                                </form>
                            </div>
                        </div>
                    )}
                </Mutation>
            );
        } else {
            return (
                <div onClick={this.handleEdit} className="task-show-user">
                    <div className="main-header-avatar-pic task-calendar">
                        <FiCalendar/>
                    </div>
                    <div className="assignee-details">
                        <div>
                            Due Date
                        </div>
                        <div>
                            {this.state.dueDate}
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default DueDateDetail