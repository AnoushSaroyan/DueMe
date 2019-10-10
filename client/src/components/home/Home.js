import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Query } from 'react-apollo';
import { USER, FETCH_TASKS } from '../../graphql/queries';
import MainHeader from '../main_header/MainHeader';
import Tiles from './Tiles';
import './home.scss';
import './tiles.scss';
import { MdExpandLess, MdExpandMore} from "react-icons/md";
import { GoTriangleRight, GoTriangleDown, GoPlus } from "react-icons/go";


class Home extends Component {
    constructor(props) {
      super(props)
      this.state = {
        currentUser: props.currentUser,
        tasks: true,
        projects: true,
      }
      this.handleCollapse = this.handleCollapse.bind(this)
    }

    handleTasks(){
      if (this.state.tasks) {
        return (
          <div className="home-section">
            <div className="home-section-header noselect" onClick={this.handleCollapse("tasks")}>
              <GoTriangleDown />
              <h2>Tasks Due Soon</h2>
              <MdExpandMore />
            </div>
            <div className="section-tiles">
              <h2>tasks go here</h2>
            </div>
          </div>
        )
      } else {
        return (
          <div className="home-section">
            <div className="home-section-header noselect" onClick={this.handleCollapse("tasks")}>
              <GoTriangleRight />
              <h2>Tasks Due Soon</h2>
              <MdExpandLess />
            </div>
          </div>
        )
      }
    }

    handleProjects(projects){
      let projectArr = [];
      projects.forEach(prjArr => {
        prjArr.forEach(prj => {
          projectArr.push(prj)
        })
      })

      if (this.state.projects) {
        return (
          <div className="home-section">
            <div className="home-section-header noselect" onClick={this.handleCollapse("projects")}>
              <GoTriangleDown />
              <h2>Recent Projects</h2>
              <MdExpandMore />
            </div>
            <div className="section-tiles">
              { projectArr.map(project => <Tiles project={project} key={project._id}/>)}
              <Link to="/main/project/new">
                <div className="tile-top">
                  <div className="tile-inner-new" >
                    <GoPlus /> 
                  </div>
                  <h2>New Project</h2>
                </div>
              </Link>
            </div>
          </div>
        )
      } else {
        return (
          <div className="home-section">
            <div className="home-section-header noselect" onClick={this.handleCollapse("projects")}>
              <GoTriangleRight />
              <h2>Recent Projects</h2>
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

    render(){
      if (!localStorage.getItem("currentUserId")) {
        return <div></div>
      }
      return (
      <Query query={USER} variables={{ _id: localStorage.getItem("currentUserId") }}>
        {({ data }) => {
          debugger
          if (data) {
            const { user } = data
            const projects = user.teams.map(team => team.projects)
          
            return<div>
                <MainHeader page={"Home"}/>
                <div className="scroll-wrapper">
                    <div className="home-page">
                        <div className="home-inner">
                          {this.handleTasks()}
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

export default Home