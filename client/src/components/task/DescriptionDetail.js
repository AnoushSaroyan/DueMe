import React, { Component } from "react";
import { UPDATE_TASK_DESCRIPTION } from '../../graphql/mutations';
import { Mutation } from "react-apollo";
import './task.scss';

class DescriptionDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            description: this.props.task.description || ""
        };

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(e) {
        e.preventDefault();
        this.setState({ editing: true });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.task._id !== prevProps.task._id) {
            this.setState({
                description: this.props.task.description
            })
        }
    }

    fieldUpdate(field) {
        return e => this.setState({ [field]: e.target.value })
    }

    render() {
        if (this.state.editing) {
            return (
                <Mutation mutation={UPDATE_TASK_DESCRIPTION}>
                    {(updateTaskDescription, data) => (
                        <div className="task-show-description-details">
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTaskDescription({
                                        variables: { id: this.props.task._id, description: this.state.description }
                                    }).then(() => this.setState({ editing: false }));
                                }}
                            >
                                <input
                                    value={this.state.description}
                                    onChange={this.fieldUpdate("description")}
                                    onBlur={e => {
                                        e.preventDefault();
                                        updateTaskDescription({
                                            variables: { id: this.props.task._id, description: this.state.description }
                                        }).then(() => this.setState({ editing: false }));
                                    }}
                                />
                                {/* <button type="submit">Update description</button> */}
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        } else {
            return (
                <div onClick={this.handleEdit} className="task-show-description-details">
                    {this.state.description ? this.state.description : <div style={{ color: "lightgray"}}>Description</div>}
                </div>
            );
        }
    }

}

export default DescriptionDetail