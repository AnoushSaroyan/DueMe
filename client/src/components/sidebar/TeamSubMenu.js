import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./teamsubmenu.scss";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaSquare } from "react-icons/fa";




class TeamSubMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: true
        }
    }

    handleCollapse(menu) {
        return () => {
            this.setState({
                [menu]: !this.state[menu]
            })
        }
    }

    renderTeamMembers(team){
        let members
        members = team.users.map(user => {
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
            return (
            <div className="main-header-avatar-pic" style={profileColor} key={user._id}>
                {rightLetters}
            </div>)})
        let three
        three = members.slice(0,3)
        return(
            <div>
                <div className="team-submenu-people">
                    <div className="team-submenu-circles">{three}</div>
                    <div className="submenu-invite-people">Invite People</div>
                </div>
            </div>
        )
    }

    renderProjects(team){
        let projects
        projects = team.projects.map(project => {
        let color
        project.color ? color = project.color : color = "#e362e3"

        let projectColor = {
            color: color
        }
    return (
        <div className="team-submenu-project" key={project._id}><Link to={`/main/project/${project._id}`}><FaSquare style={projectColor}/>{project.name}</Link></div>
    )
    })
        return(
            <div className="team-submenu-projects">
                {projects}
            </div>
        )
    }

    handleSubMenu(team){
        if (this.state.open) {
            return (
                <div className="team-submenu">
                    <div className="team-submenu-title noselect"><TiArrowSortedDown onClick={this.handleCollapse("open")}/><Link className="submenu-team-name">{team.name}</Link></div>
                    {this.renderTeamMembers(team)}
                    {this.renderProjects(team)}
                </div>
            )
        } else {
            return (
                <div className="team-submenu">
                    <div className="team-submenu-title noselect"><TiArrowSortedUp onClick={this.handleCollapse("open")}/><Link className="submenu-team-name">{team.name}</Link></div>
                </div>
            )
        }
    }




    render(){
        const { team } = this.props
        return this.handleSubMenu(team)
    }
}

export default TeamSubMenu