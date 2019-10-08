import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./teamsubmenu.scss";


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
        members = team.users.map(user => <div><Link>{user.name}</Link></div>)
        return(
            <div>
                {members}
            </div>
        )
    }

    renderProjects(team){
        let projects
        projects = team.projects.map(project => <div><Link>{project.name}</Link></div>)
        return(
            <div>
                {projects}
            </div>
        )
    }

    render(){
        const { team } = this.props
        return<div>
            <Link className="submenu-team-name">{team.name}</Link>
            {this.renderTeamMembers(team)}
            {this.renderProjects(team)}
        </div>
    }
}

export default TeamSubMenu