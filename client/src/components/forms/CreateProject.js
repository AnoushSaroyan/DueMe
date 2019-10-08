import React, { Component } from 'react';

class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            projects: [],
            users: []
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    render(){
        return <div>
            Hi
        </div>
    }
}

export default CreateProject