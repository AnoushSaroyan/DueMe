import React from "react";
import { Query, Mutation } from "react-apollo";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import { withRouter } from "react-router";
const { FETCH_USERS, FETCH_USER_MESSAGES, CURRENT_USER } = Queries;
const { CREATE_CHAT } = Mutations;

class UserIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Query query={FETCH_USERS}>

            </Query>
        )

    }
}
