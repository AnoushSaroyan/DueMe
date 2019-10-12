import React, { Component } from 'react';
import { UPDATE_TASK_USER } from '../../graphql/mutations';
import { Mutation } from "react-apollo";
import './task.scss';
import { FiCalendar } from "react-icons/fi";

class DueDateDetail extends Component{
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            task: this.props.task || ""
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
                user: this.props.task.user
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
                <Mutation mutation={UPDATE_TASK_USER}>
                    {(updateTaskUser, data) => (
                        <div className="task-show-title">
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTaskUser({
                                        variables: { id: this.props.task._id, title: this.state.title }
                                    }).then(() => this.setState({ editing: false }));
                                }}
                            >
                                <input
                                    value={this.state.title}
                                    onChange={this.fieldUpdate("title")}
                                    onBlur={e => {
                                        e.preventDefault();
                                        updateTaskUser({
                                            variables: { id: this.props.task._id, title: this.state.title }
                                        }).then(() => this.setState({ editing: false }));
                                    }}
                                />
                                {/* <button type="submit">Update title</button> */}
                            </form>
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
                            {task.dueDate}
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default DueDateDetail