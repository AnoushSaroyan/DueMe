import React, { Component } from 'react';
import MainHeader from '../main_header/MainHeader';

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
            <MainHeader page={"New Project"} />
            Hi
        </div>
    }
}

export default CreateProject