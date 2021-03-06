import React, { Component } from 'react';
import { UPDATE_TASK_ASSIGNEE} from '../../graphql/mutations';
import { Mutation } from "react-apollo";
import { USER, PROJECT } from '../../graphql/queries';
import './task.scss';

class AssigneeDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            editing: false,
            task: this.props.task || "",
            user: ""
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
                task: this.props.task
            })
        }
        // if (prevState.project !== this.state.project) {
        //     this.setState({
        //         user: ""
        //     })
        // }
    }

    fieldUpdate(field) {
        return e => this.setState({ [field]: e.target.value })
    }


    constructUserSelection(task, updateTaskAssignee) {
        let users = []
        users = task.project.team.users
        // if (users.length > 0 && users[0] && !this.state.user) this.setState({ user: users[0]._id })
        let userOptions
        userOptions = users.map(user => <option key={user._id} value={user._id} selected={task.user._id == user._id}>{user.name}</option>)
        return (
            <div className="assignee-details">
                <div>
                    Assigned To
                </div>
                <select 
                name="user" 
                // value={this.state.user} 
                onChange={this.fieldUpdate("user")} 
                className="user-show-assignee-input"
                onBlur={e => {
                    e.preventDefault();

                    updateTaskAssignee({
                        variables: { id: this.props.task._id, user: this.state.user }
                    }).then(() => this.setState({ editing: false }));
                }}
                >
                    {userOptions}
                </select>
            </div>
        )
    }

    render(){
        const { user } = this.props.task
        const abbreviatedName = user.name.split(" ").map(word => word[0])
        let rightLetters
        if (abbreviatedName.length === 1) {
            rightLetters = abbreviatedName[0]
        } else {
            rightLetters = [abbreviatedName[0] + abbreviatedName[abbreviatedName.length - 1]]
        }

        let color
        user.color ? color = user.color : color = "#e362e3"
        let profileColor = {
            backgroundColor: color
        }

        if (this.state.editing) {
            return (
                <Mutation 
                mutation={UPDATE_TASK_ASSIGNEE}
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
                    {(updateTaskAssignee, data) => (
                        <div className="task-show-user">
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTaskAssignee({
                                        variables: { id: this.props.task._id, user: this.state.user }
                                    }).then(() => this.setState({ editing: false }));
                                }}
                            >
                                {this.constructUserSelection(this.props.task, updateTaskAssignee)}
                                {/* <input
                                    value={this.state.user}
                                    onChange={this.fieldUpdate("user")}
                                    onBlur={e => {
                                        e.preventDefault();
                                        updateTaskAssignee({
                                            variables: { id: this.props.task._id, user: this.state.title }
                                        }).then(() => this.setState({ editing: false }));
                                    }}
                                /> */}
                                {/* <button type="submit">Update title</button> */}
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        } else {
            return (
                <div onClick={this.handleEdit} className="task-show-user">
                    <div className="main-header-avatar-pic" style={profileColor} >
                        {rightLetters}
                    </div>
                    <div className="assignee-details">
                        <div>
                            Assigned To
                        </div>
                        <div>
                            {user.name}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default AssigneeDetail