import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { USER } from '../../graphql/queries';
import MainHeader from '../main_header/MainHeader';
import './home.scss';
import { MdExpandLess, MdExpandMore } from "react-icons/md";


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
            <div className="home-section-header" onClick={this.handleCollapse("tasks")}>
              <h2>Tasks Due Soon</h2>
              <MdExpandLess />
            </div>
            <div className="section-tiles">
              <h2>tasks go here</h2>
            </div>
          </div>
        )
      } else {
        return (
          <div className="home-section">
            <div className="home-section-header" onClick={this.handleCollapse("tasks")}>
              <h2>Tasks Due Soon</h2>
              <MdExpandMore />
            </div>
          </div>
        )
      }
    }

    handleProjects(){
      if (this.state.projects) {
        return (
          <div className="home-section">
            <div className="home-section-header" onClick={this.handleCollapse("projects")}>
              <h2>Recent Projects</h2>
              <MdExpandLess />
            </div>
            <div className="section-tiles">
              <h2>projects go here</h2>
            </div>
          </div>
        )
      } else {
        return (
          <div className="home-section">
            <div className="home-section-header" onClick={this.handleCollapse("projects")}>
              <h2>Recent Projects</h2>
              <MdExpandMore />
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
        
          return<div>
              <MainHeader page={"Home"}/>
              <div className="scroll-wrapper">
                  <div className="home-page">
                      <div className="home-inner">
                        {this.handleTasks()}
                        {this.handleProjects()}
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