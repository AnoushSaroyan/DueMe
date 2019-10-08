import React, { Component } from 'react';
import MainHeader from '../main_header/MainHeader';
import './task.scss';
import ReactPlayer from 'react-player'

class Task extends Component {
	render() {
		return <div>
			<MainHeader page={"Task"} />
			<div className="scroll-wrapper">
				<div className="task-page">
					<div className="task-header"> {} completed </div>
					<div className="task-intro">
					</div>
					<div className="task-column">
						<div className="add-task">
							<div className="add-task-button"> Add Task </div>
						</div>
						<div className="task-list">
							{}items
						</div>
					</div>
                </div>
			</div>
		</div>
	}
}

export default Task