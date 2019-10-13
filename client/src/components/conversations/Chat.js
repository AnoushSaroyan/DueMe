import React from "react";
import { Query, Subscription, Mutation } from "react-apollo";
import { FETCH_CHAT, FETCH_OR_CREATE_CHAT_WITH_USER } from "../../graphql/queries";
import { NEW_MESSAGE_SUBSCRIPTION } from "../../graphql/subscription"
import CreateMessage from "./CreateMessage";
// import { FETCH_OR_CREATE_CHAT_WITH_USER } from "../../graphql/mutations";


const Chat = (props) => (
    <Query query={FETCH_OR_CREATE_CHAT_WITH_USER} variables={{ id1: localStorage.getItem("currentUserId"), id2: props.match.params.userId }}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return `Error! ${error.message}`
            // debugger
            // if (loading) return <p>Loading...</p>
            // if (error) return `Error! ${error.message}`

            let chatMessages = data.fetchOrCreateChatWithUser.messages;
            // let chatData = data;
            // let userId = props.match.params.userId
            let chatId = data.fetchOrCreateChatWithUser._id;
            let author;
            // debugger
            return (
                <Subscription subscription={NEW_MESSAGE_SUBSCRIPTION}>
                    {(args)  => {
                        // debugger
                        return (
                            <div>
                                {/* <ul> */}
                                    {chatMessages.map(message => {
                                        
                                        // debugger
                                        // if (!message.user) {
                                        //     debugger
                                        // }
                                        author = data.fetchOrCreateChatWithUser.users.filter(user => user._id === message.user._id)[0];
                                        if(!author) {
                                            debugger
                                        }
                                        return (
                                            <div key={message._id}>
                                                <p>{author.name}</p>
                                                <p>{message.content}</p>
                                            </div>
                                        )
                                    })}
                                {/* </ul> */}
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