import React from "react";
import { Query, Subscription } from "react-apollo";
import { FETCH_CHAT } from "../../graphql/queries";
import { NEW_MESSAGE_SUBSCRIPTION } from "../../graphql/subscription"
import CreateMessage from "./CreateMessage";

class Chat extends React.Component {
    messageAuthor(message, chatData) {
        let author = chatData.chat.users.filter(user => user._id === message.user._id)[0];
        return author.name;
    }

    render() {
        let chatPath = this.props.history.location.pathname.split("/");
        let chatId = chatPath.slice(-1)[0];
        
        return (
            <Query query={FETCH_CHAT} variables={{ id: chatId }}>
                {({ loading, error, data }) => {
                    // debugger
                    if (loading) return <p>Loading...</p>
                    if (error) return `Error! ${error.message}`

                    let chatMessages = data.chat.messages;
                    let chatData = data;
                    return (
                        <Subscription subscription={NEW_MESSAGE_SUBSCRIPTION}>
                            {(args) => {
                                debugger
                                return (
                                    
                                    <div>
                                        <ul>
                                            {chatMessages.map(message => {
                                                return (
                                                    <div>
                                                        <p>{this.messageAuthor(message, chatData)}</p>
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
        )
    }
}

export default Chat;