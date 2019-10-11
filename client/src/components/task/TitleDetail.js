import React, { Component } from "react";
import { UPDATE_TASK_TITLE } from '../../graphql/mutations';
import { Mutation } from "react-apollo";
import './task.scss';


class TitleDetail extends Component{
    constructor(props){
        super(props);

        this.state = {
            editing: false,
            title: this.props.task.title || ""
        };

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(e){
        e.preventDefault();
        this.setState({ editing: true });
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.task._id !== prevProps.task._id) {
            this.setState({
                title: this.props.task.title
            })
        }
    }

    fieldUpdate(field){
        return e => this.setState({ [field]: e.target.value })
    }

    render(){
        if (this.state.editing) {
            return (
                <Mutation mutation={UPDATE_TASK_TITLE}>
                    {(updateTaskTitle, data) => (
                        <div className="task-show-title">
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTaskTitle({
                                        variables: { id: this.props.task._id, title: this.state.title }
                                    }).then(() => this.setState({ editing: false }));
                                }}
                            >
                                <input
                                    value={this.state.title}
                                    onChange={this.fieldUpdate("title")}
                                />
                                <button type="submit">Update title</button>
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        } else {
            return (
                    <div onClick={this.handleEdit} className="task-show-title">
                        <h2>{this.state.title}</h2>
                    </div>
            );
        }
    }
    
}

export default TitleDetail