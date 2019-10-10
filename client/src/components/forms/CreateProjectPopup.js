import React, { Component } from 'react';
import { MdClear } from "react-icons/md";
import { withRouter, Link } from 'react-router-dom';
import "./create-project-popup.scss";
import { Mutation } from "react-apollo";
import { CHANGE_USER_COLOR } from "../../graphql/mutations";
import { USER } from "../../graphql/queries";

class CreateProjectPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            thing: this.props.thing,
            color: "red",
            message: ""
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose() {
        const playlistForm = document.getElementById("project-popup");
        playlistForm.classList.remove("active");
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e, ChangeUserColor){
        e.preventDefault();
        ChangeUserColor({
            variables: {
                _id: localStorage.getItem("currentUserId"),
                color: this.state.color
            }
        }).then(() => this.handleClose())
    }

    render() {
        if (this.state.thing === "userColor"){
            return(
            <Mutation 
            mutation={CHANGE_USER_COLOR}
            onError={err => this.setState({ message: err.message })}
            refetchQueries={() => {
                return [
                    {
                        query: USER,
                        variables: { _id: localStorage.getItem("currentUserId") }
                    }
                ]
            }
            }
            onCompleted={data => {
                const { name } = data.newTeam;
                this.setState({
                    message: `New team ${name} created successfully!`
                });
                this.props.history.push('/');
            }}
            >
            {(ChangeUserColor, { data }) => (
                <div  className="dialog color-dialog" id="project-popup">
                    <div className="project-popup-wrapper">
                        <form onSubmit={e => this.handleSubmit(e , ChangeUserColor)}>
                            <h1>Pick a new color!</h1>
                            <input type="color" name="favcolor" value={this.state.color} onChange={this.update("color")}/>
                            <button type="submit">Create Project</button>
                        </form>
                    </div>
                </div>
            )}
                </Mutation>
            )
        }


        return (
            <div className="dialog" id="project-popup">
                <div className="project-popup-wrapper">
                    <h1>Hold up!</h1>
                    <h2>You gotta create a {this.state.thing.toLowerCase()} first!</h2>
                    <Link to={`/main/${this.state.thing.toLowerCase()}/new`}>Create {this.state.thing}</Link>
                </div>
            </div>
        )
    }

}

export default withRouter(CreateProjectPopup)