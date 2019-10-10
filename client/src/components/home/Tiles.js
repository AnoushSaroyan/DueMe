import React, { Component } from 'react';
import { DiCode, DiRuby, DiGitMerge,  } from "react-icons/di";
import { GoBug, GoTasklist } from "react-icons/go";
import './tiles.scss'

class Tiles extends Component{
  constructor(props){
    super(props)
  }

  render(){
    if(!this.props.project){
      return <div></div>
    }
  
    return (
      <div className="tile-top">
        <div className="tile-inner" style={{backgroundColor: this.props.project.color}}>
          <DiRuby />
        </div>
        <h2>{this.props.project.name}</h2>
      </div>
    )
  }
}

export default Tiles;