import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
    }

    render(){
        const { team } = this.props
        return<div>
            <Link>{team.name}</Link>
            {this.renderTeamMembers(team)}
        </div>
    }
}

export default TeamSubMenu