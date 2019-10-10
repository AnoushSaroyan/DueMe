import React, { Component } from "react";
import './task-row.scss';
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { UPDATE_TASK_STATUS } from "../../graphql/mutations";
import { Mutation} from "react-apollo";
import { FETCH_TASK } from "../../graphql/queries";

class TaskRow extends Component{
    constructor(props){
        super(props)
        this.state = {
            completed : props.task.completed,
            message: ""
        }
        this.handleComplete = this.handleComplete.bind(this)
    }

    handleUserName(user){
        let color
        user.color ? color = user.color : color = "#e362e3"
        let profileColor = {
            backgroundColor: color
        }
        const abbreviatedName = user.name.split(" ").map(word => word[0])
        let rightLetters
        if (abbreviatedName.length === 1) {
            rightLetters = abbreviatedName[0]
        } else {
            rightLetters = [abbreviatedName[0] + abbreviatedName[abbreviatedName.length - 1]]
        }

        return (
            <div className="main-header-avatar-pic task-row-avatar-pic" style={profileColor} key={user._id}>
                {rightLetters}
             </div>
        )

    }

    handleDate(dueDate){
        let date = new Date(dueDate)
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dueDay = days[date.getDay()]
        return <div className="task-row-duedate">
            {dueDay}
        </div>
    }

    handleCheckmark(task){
        if (this.state.completed){
            return <FaRegCheckCircle className="task-row-checked" onClick={this.handleComplete}/>
        } else {
            return <FaRegCheckCircle className="task-row-not-checked" onClick={this.handleComplete}/>
        }

    }

    handleComplete(e){
        e.stopPropagation();
        this.setState ({
            completed: !this.state.completed
        })
    }
    
    render(){
        const { task, type } = this.props
        let displayTitle = task.title ? task.title : task.description
        let user = task.user
        let dueDate = task.dueDate
        
        if ( type === "project"){
            return(
                <div className="task-row">
                    <div className="task-row-wrapper">
                    <div className="task-row-left noselect">
                        <Mutation 
                        mutation={UPDATE_TASK_STATUS}
                        onError={err => this.setState({ message: err.message })}
                        refetchQueries={() => {
                            return [
                                {
                                    query: FETCH_TASK,
                                    variables: { _id: task._id }
                                }
                            ]
                        }
                        }
                        onCompleted={data => {
                            const { title } = data.newProject;
                            this.setState({
                                message: `task ${title} update successfully!`
                            });
                            this.props.history.push('/');
                        }}
                        >
                            {(updateTaskStatus, { data }) => (
                            this.handleCheckmark(task, updateTaskStatus)
                            )}
                        </Mutation>
                        {displayTitle}  
                    </div>  
                    <div className="task-row-right">
                        {this.handleDate(dueDate)}
                        {this.handleUserName(user)}
                    </div>
                    </div>
                </div>
            )
        }
    }
}

export default TaskRow