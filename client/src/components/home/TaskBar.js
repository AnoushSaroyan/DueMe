import React, { Component } from 'react';
import './tiles.scss'

class TaskBar extends Component {
  render() {
    if (!this.props.project) {
      return <div></div>
    }

    return (
      <div className="tile-top">
        <div className="tile-inner" style={{ backgroundColor: this.props.project.color }}>
          {this.insertImage(this.props.project.name)}
        </div>
        <h2>{this.props.project.name}</h2>
      </div>
    )
  }
}

export default TaskBar;