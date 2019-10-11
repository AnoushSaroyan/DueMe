import React, { Component } from "react";
import MainHeader from '../main_header/MainHeader';
import { useQuery, Query } from "react-apollo";
import { USER, PROJECT } from '../../graphql/queries';
import './project.scss';
import TaskRow from '../task/TaskRow';
import { MdPersonOutline, mdAdd } from "react-icons/md";
import Task from '../task/Task'

class Project extends Component {
    constructor(props){
        super(props)
        this.state = {
            projectId: this.props.match.params.id,
            openedTask: ""
        }
        this.handleSlide = this.handleSlide.bind(this)
    }

    // componentDidMount(){
    //     this.setState({
    //         projectId: 
    //     })
    // }
    handleSlide(e) {
        const slider = document.getElementById("task-details")
        this.setState({
            openedTask: e.currentTarget.id
        })
        slider.classList.add("task-details-slide")
    }


    componentDidUpdate(prevProps, prevState){
        if (prevProps.match.params.id !== this.props.match.params.id){
            this.setState({
                projectId: this.props.match.params.id
            })
        }
    }

    render(){
        if (!localStorage.getItem("currentUserId")) {
            return <div></div>
        }

        return(
            <Query query={PROJECT} variables={{ _id: this.state.projectId }}>
                {({ loading, error, data }) => {  
                    if (loading) return null;
                    if (error) return <option>{`Error! ${error}`}</option>;
                    const { project } = data
                    // const teams = user.teams
                    // let foundProject = project
                    // const team = teams.find(team => team.projects.find(project => {if(project._id == this.state.projectId){
                    //     foundProject = project
                    //     return project
                    // }}))
                    let task = []
                    task = project.tasks.map(task => <div key={task._id} onClick={this.handleSlide} id={task._id}><TaskRow task={task} type={"project"} projectId={this.state.projectId}/></div>)
                    return(
                        <div>
                            <MainHeader page={project.name} color={project.color} type={"project"}/>
                            <div className="scroll-wrapper">
                                <div className="project-show">
                                    <div className="project-show-wrapper">
                                        <div className="project-show-spreadsheet">
                                            <div className="project-show-add-task-row">
                                                <div className="add-task-button">Add Task</div>
                                                <MdPersonOutline/>
                                            </div>
                                            {task}
                                        </div>
                                        <div className="project-show-task-details" id="task-details">
                                            <Task taskId={this.state.openedTask} />
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

export default Project