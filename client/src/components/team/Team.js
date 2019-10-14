import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { USER, FETCH_USERS } from '../../graphql/queries';
import MainHeader from '../main_header/MainHeader';
import Tiles from '../home/Tiles';
// import './home.scss';
import '../home/tiles.scss';
import '../project/project.scss'
import './team.scss'
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { GoTriangleRight, GoTriangleDown, GoPlus } from "react-icons/go";
import { REMOVE_USER_FROM_TEAM } from "../../graphql/mutations";


class Team extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: props.currentUser,
      members: true,
      projects: true,
    }
    this.handleCollapse = this.handleCollapse.bind(this)
  }

  renderRemove(user, removeUserFromTeam, team){
    if (user._id !== localStorage.getItem("currentUserId")) {
      return    <div className="team-members-delete" onClick={() => {
      removeUserFromTeam({ variables: { _id: team._id, userId: user._id } })
    }}>
      remove
    </div>
    }
    return <div></div>
  }

  handleMembers(team) {
    if (this.state.members) {
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
            <div className="team-members-wrapper">
              <Link to={`/main/user/${user._id}`} className="team-members">
                <div className="main-header-avatar-pic" style={profileColor} key={user._id}>
                  {rightLetters}
                </div>
                <h2>{user.name}</h2>
              </Link>
              <Mutation
                mutation={REMOVE_USER_FROM_TEAM}
                refetchQueries={() => {
                  return [
                    {
                      query: USER,
                      variables: { _id: localStorage.getItem("currentUserId") }
                    },
                    {
                      query: FETCH_USERS
                    }
                  ]
                }}
              >
                {removeUserFromTeam => (
                  this.renderRemove(user, removeUserFromTeam, team)
                )}
              </Mutation>
            </div>
          )
        })

        return (
          <div className="team-section">
            <div className="home-section-header noselect" onClick={this.handleCollapse("members")}>
              <GoTriangleDown />
              <h2>Members</h2>
              <MdExpandMore />
            </div>
              <div>
                {members}
              </div>
          </div>
        )
    }else {
      return (
        <div className="team-section">
          <div className="home-section-header noselect" onClick={this.handleCollapse("members")}>
            <GoTriangleRight />
            <h2>Members</h2>
            <MdExpandLess />
          </div>
        </div>
      )
    }
  }

  handleProjects(projects) {
    if (this.state.projects) {
      return (
        <div className="team-section">
          <div className="home-section-header noselect" onClick={this.handleCollapse("projects")}>
            <GoTriangleDown />
            <h2>Projects</h2>
            <MdExpandMore />
          </div>
          <div className="section-tiles">
            {projects.map(project => <Tiles project={project} key={project._id} />)}
            <div className="tile-top">
              <Link to="/main/project/new">
                <div className="tile-inner-new" >
                  <GoPlus />
                </div>
                <h2>New Project</h2>
              </Link>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="team-section">
          <div className="home-section-header noselect" onClick={this.handleCollapse("projects")}>
            <GoTriangleRight />
            <h2>Projects</h2>
            <MdExpandLess />
          </div>
        </div>
      )
    }
  }

  handleCollapse(menu) {
    return () => {
      this.setState({
        [menu]: !this.state[menu]
      })
    }
  }

  render() {
    if (!localStorage.getItem("currentUserId")) {
      return <div></div>
    }
    return (
      <Query query={USER} variables={{ _id: localStorage.getItem("currentUserId") }}>
        {({ data }) => {

          if (data) {
            const { user } = data
            let filteredTeam = user.teams.filter(team => team._id === this.props.match.params.id);
            const projects = filteredTeam[0].projects.flat()
            return <div>
              <MainHeader page={filteredTeam[0].name} teamId={filteredTeam[0]._id} type={"team"}/>
              <div className="scroll-wrapper">
                <div className="team-page">
                  <div className="team-inner">
                    {this.handleMembers(filteredTeam[0])}
                    {this.handleProjects(projects)}
                  </div>
                </div>
              </div>
            </div>
          }
          else return <div></div>
        }}
      </Query>
    )
  }
}

export default Team;