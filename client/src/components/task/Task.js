import React, { Component } from 'react';

class Task extends Component{
    constructor(props){
        super(props)
        this.state = {
            taskId: this.props.taskId
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.taskId !== this.props.taskId){
            this.setState({
                taskId: this.props.taskId
            })
        }
    }

    render(){
        return(
            <div>Hi
                taskId: {this.state.taskId}
            </div>
        )
    }
}

export default Task