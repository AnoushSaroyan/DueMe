import React from "react";
import { Query, Subscription } from "react-apollo";
import { FETCH_CHAT } from "../../graphql/queries";
import { NEW_MESSAGE_SUBSCRIPTION } from "../../graphql/subscription"
import CreateMessage from "./CreateMessage";

const Chat = (props) => (
    <Query query={FETCH_CHAT} variables={{ id: props.match.params.chatId }}>
        {({ loading, error, data }) => {
            // debugger
            if (loading) return <p>Loading...</p>
            if (error) return `Error! ${error.message}`

            let chatMessages = data.chat.messages;
            let chatData = data;
            let chatId = props.match.params.chatId
            return (
                <Subscription subscription={NEW_MESSAGE_SUBSCRIPTION}>
                    {(args) => {
                        // debugger
                        return (
                            <div>
                                <ul>
                                    {chatMessages.map(message => {
                                        let author = chatData.chat.users.filter(user => user._id === message.user._id)[0];
                                        return (
                                            <div>
                                                <p>{author.name}</p>
                                                <p>{message.content}</p>
                                            </div>
                                        )
                                    })}
                                </ul>
                                <CreateMessage chat={chatId}/>
                            </div>
                        );
                    }}
                </Subscription>
            )
        }}
    </Query>
);

export default Chat;