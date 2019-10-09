import React, { Component } from "react";
import MainHeader from '../main_header/MainHeader';
import { useQuery, Query } from "react-apollo";
import { USER, PROJECT } from '../../graphql/queries';

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
            <Query query={USER} variables={{ _id: localStorage.getItem("currentUserId") }}>
                {({ loading, error, data }) => {  
                    if (loading) return null;
                    if (error) return <option>{`Error! ${error}`}</option>;
                    const { user } = data
                    const teams = user.teams
                    let foundProject
                    const team = teams.find(team => team.projects.find(project => {if(project._id == this.state.projectId){
                        foundProject = project
                        return project
                    }}))
                    return(
                        <div>
                            <MainHeader page={foundProject.name} color={foundProject.color} type={"project"}/>
                        </div>)
                }}
            </Query>
        )
    }
}

export default Project