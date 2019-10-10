import React, { Component } from 'react';
import { DiGitMerge  } from "react-icons/di";
import { GoBug, GoRocket, GoFileCode, GoChecklist } from "react-icons/go";
import './tiles.scss'

class Tiles extends Component{
  insertImage(name){
    const imgArr = [<GoFileCode />, <GoRocket />, <DiGitMerge/>, <GoBug/>, <GoChecklist/>];
    
    if(name === "Development"){
      return imgArr[0];
    }else if(name === "Develop Demo Account"){
      return imgArr[1];
    }else if(name.split(" ").includes("Git")){
      return imgArr[2]
    }else if(name === "Bug Tracking"){
      return imgArr[3];
    }
    return imgArr[4];
  }

  render(){
    if(!this.props.project){
      return <div></div>
    }
  
    return (
      <div className="tile-top">
        <div className="tile-inner" style={{backgroundColor: this.props.project.color}}>
          {this.insertImage(this.props.project.name)}
        </div>
        <h2>{this.props.project.name}</h2>
      </div>
    )
  }
}

export default Tiles;