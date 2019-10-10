import React, { Component } from "react";
import MainHeader from '../main_header/MainHeader';
import { useQuery, Query } from "react-apollo";
import { USER, PROJECT } from '../../graphql/queries';
import './project.scss';

class Project extends Component {
    constructor(props){
        super(props)
        this.state = {
            projectId: this.props.match.params.id
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         projectId: 
    //     })
    // }

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
                    task = project.task

                    return(
                        <div>
                            <MainHeader page={project.name} color={project.color} type={"project"}/>
                            <div className="scroll-wrapper">
                                <div className="project-show">
                                    <div>Add task button</div>
                                </div>
                            </div>
                        </div>)
                }}
            </Query>
        )
    }
}

export default Project