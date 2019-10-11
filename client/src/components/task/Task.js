import React, { Component } from 'react';
import { MdDone, MdClear } from "react-icons/md";
import './task.scss'
import { TASK } from '../../graphql/queries';
import { Query } from "react-apollo";
import TitleDetail from './TitleDetail';

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

    render(){
        return(
            <div className="task-show">
                <div className="project-show-add-task-row">
                    <div className="add-task-button task-mark-complete"><MdDone/>Mark Complete</div>
                    <MdClear className="task-show-close-button" onClick={this.handleClose}/>
                </div>
                <div className="task-scroll-wrapper">
                    <Query query={TASK} variables={{ _id: this.state.taskId }} >
                        {({ loading, error, data }) => {
                            if (loading) return this.renderLoading()
                            if (error) return <option>{`Error! ${error}`}</option>;
                                const { task } = data
                                debugger
                            return(
                                <div>
                                    <TitleDetail task={task}/>


                                </div>
                            )
                        }}
                    </Query>
                </div>
            </div>
        )
    }
}

export default Task