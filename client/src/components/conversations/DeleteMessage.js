import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { DELETE_MESSAGE } from "../../graphql/mutations";
import { CURRENT_USER, FETCH_CHAT } from "../../graphql/queries";
import { Query } from "react-apollo";


class DeleteMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e, deleteMessage, currentUserId) {
        e.preventDefault();
        // debugger
        deleteMessage({
            variables: {
                messageId: this.props.messageId,
                currentUserId: currentUserId,
                chat: this.props.chat
            }
        });
    }

    render() {
        return (
            <Query query={CURRENT_USER} >
                {({ data }) => {
                    const currentUserId = data.currentUserId;
                    return (
                        <Mutation
                            mutation={DELETE_MESSAGE}
                            // update={(cache, data) => this.updateCache(cache, data)} 
                            refetchQueries={() => [{ query: FETCH_CHAT, variables: { id: this.props.chat } }]}
                        >

                            {(deleteMessage, { data }) => { 
                                // debugger
                                return (
                                    <div>
                                        <button onClick={e => this.handleSubmit(e, deleteMessage, currentUserId)}>
                                            Delete
                                        </button>
                                    </div>
                                )
                            }
                            }
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default withRouter(DeleteMessage);