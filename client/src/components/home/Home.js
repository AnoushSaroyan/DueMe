import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Query } from 'react-apollo';
import { USER, FETCH_TASKS, PROJECT } from '../../graphql/queries';
import MainHeader from '../main_header/MainHeader';
import TaskModal from '../task/TaskModal';
import TaskRow from '../task/TaskRow';
import Tiles from './Tiles';
import './home.scss';
import './tiles.scss';
import '../project/project.scss'
import { MdExpandLess, MdExpandMore} from "react-icons/md";
import { GoTriangleRight, GoTriangleDown, GoPlus } from "react-icons/go";


class Home extends Component {
    constructor(props) {
      super(props)
      this.state = {
        currentUser: props.currentUser,
        tasks: true,
        projects: true,
        openedTask: "",
        taskStatus: ""
      }
      this.handleCollapse = this.handleCollapse.bind(this)
      this.handleSlide = this.handleSlide.bind(this)
    }

    handleSlide(e) {
      const slider = document.getElementById("task-details")
      let bool = e.currentTarget.getAttribute("value")
      if (bool === "true") {
        bool = true
      } else {
        bool = false
      }
      this.setState({
        openedTask: e.currentTarget.id,
        taskStatus: bool
      })
      // slider.classList.add("task-details-slide")
      // let modal = document.getElementById("task-modal")
      // if (modal) modal.classList.add("active")
      const playlistForm = document.getElementById("task-popup");
      playlistForm.classList.add("active");
    }

    handleTasks(projects, user){
      if (this.state.tasks) {

            let taskDivs = []
            let userTasks = []
            taskDivs = projects.map(project => project.tasks).flat();
            let filteredTasks = taskDivs.filter(task => task.user._id === user._id)
            userTasks = filteredTasks.map(task => {
              return (
              <div>
                <div key={task._id} onClick={this.handleSlide} id={task._id} value={task.completed}>
                  <TaskRow task={task} type={"user"} projectId={task.project._id} userId={user._id} />
                </div>
              </div>
              )
            })

            let foundTask
            if (this.state.openedTask) {
              foundTask = filteredTasks.find(task => task._id === this.state.openedTask)
              if (foundTask && foundTask.completed !== this.state.taskStatus) {
                this.setState({
                  taskStatus: foundTask.completed
                })
              }
            }
        return (
          <div className="home-section">
            <div className="home-section-header noselect" onClick={this.handleCollapse("tasks")}>
              <GoTriangleDown />
              <h2>Tasks Due Soon</h2>
              <MdExpandMore />
            </div>
            <div className="section-tiles-tasks" id="task-details">
              {userTasks}
            </div>
          </div>
        )
      }else {
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
      if (this.state.projects) {
        return (
          <div className="home-section">
            <div className="home-section-header noselect" onClick={this.handleCollapse("projects")}>
              <GoTriangleDown />
              <h2>Recent Projects</h2>
              <MdExpandMore />
            </div>
            <div className="section-tiles">
              { projects.map(project => <Tiles project={project} key={project._id}/>)}
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

          if (data) {
            const { user } = data
            const projects = user.teams.map(team => team.projects).flat()
            return<div>
                <MainHeader page={"Home"}/>
              <div className="dialog color-dialog" id="task-popup">
                <div className="project-show-task-details task-details-slide task-details-modal">
                    <TaskModal taskId={this.state.openedTask} completed={this.state.taskStatus} />
                  </div>
                </div>
                <div className="scroll-wrapper">
                    <div className="home-page">
                        <div className="home-inner">
                          {this.handleTasks(projects, user)}
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