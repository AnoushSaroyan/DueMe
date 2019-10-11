import React, { Component } from "react";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import { UPDATE_TASK_TITLE } from '../../graphql/mutations';
import { Mutation } from "react-apollo";


class TitleDetail extends Component{
    constructor(props){
        super(props);

        this.state = {
            editing: false,
            name: this.props.task.name || ""
        };

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(e){
        e.preventDefault();
        this.setState({ editing: true });
    }

    fieldUpdate(field){
        return e => this.setState({ [field]: e.target.value })
    }

    render(){
        if (this.state.editing) {
            return (
                <Mutation mutation={UPDATE_TASK_TITLE}>
                    {(updateTaskTitle, data) => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTaskTitle({
                                        variables: { id: this.props.task._id, name: this.state.name }
                                    }).then(() => this.setState({ editing: false }));
                                }}
                            >
                                <input
                                    value={this.state.name}
                                    onChange={this.fieldUpdate("name")}
                                />
                                <button type="submit">Update Name</button>
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        } else {
            return (
                <div>
                    <div
                        onClick={this.handleEdit}
                        style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
                    >
                        <IconContext.Provider value={{ className: "custom-icon" }}>
                            <FaPencilAlt />
                        </IconContext.Provider>
                    </div>
                    <h2>{this.state.name}</h2>
                </div>
            );
        }
    }
    
}

export default TitleDetail