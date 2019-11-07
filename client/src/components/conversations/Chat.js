import React from "react";
import { Query, Subscription } from "react-apollo";
import { FETCH_OR_CREATE_CHAT_WITH_USER } from "../../graphql/queries";
import { NEW_MESSAGE_SUBSCRIPTION, DELETED_MESSAGE_SUBSCRIPTION } from "../../graphql/subscription"
import CreateMessage from "./CreateMessage";
import DeleteMessage from "./DeleteMessage";
import './chat.scss';
import MainHeader from '../main_header/MainHeader'
// import { FETCH_OR_CREATE_CHAT_WITH_USER } from "../../graphql/mutations";


class Chat extends React.Component  {


    renderLoading() {
        return (
            <div className="la-ball-clip-rotate-multiple la-dark la-3x main-page-load">
                <div></div>
                <div></div>
            </div>
        )
    }
    
    render(){
        return(
    <Query query={FETCH_OR_CREATE_CHAT_WITH_USER} variables={{ id1: localStorage.getItem("currentUserId"), id2: this.props.match.params.userId }}>
        {({ loading, error, data }) => {
            if (loading) return this.renderLoading()
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
                        <Subscription subscription={DELETED_MESSAGE_SUBSCRIPTION}>
                            {(args) => {
                            return (
                                <div>
                                    <MainHeader page={"Chat"}/>
                                    <div  className="chat-show">
                                    <div className="chat-show-wrapper">
                                        <div className="chat-show-main">
                                        {/* <ul> */}
                                        {chatMessages.map(message => {
                                            author = data.fetchOrCreateChatWithUser.users.filter(user => user._id === message.user._id)[0];
                                            let msgId = message._id;
                                            // if (msgId === undefined) {
                                            //     debugger
                                            // }
                                            // formatting the date 
                                            const date = message.date.slice(0, 10);
                                            const tmp = (parseInt(message.date.slice(11, 13)) + 17);
                                            const houres = tmp % 12;
                                            const minutes = message.date.slice(14, 16); 
                                            const am_pm = (tmp % 24) >= 12 ? "pm" : "am";

                                            // avatar styling: Thanks Carlos, lol
                                            const abbreviatedName = author.name.split(" ").map(word => word[0])
                                            let rightLetters;
                                            if (abbreviatedName.length === 1) {
                                                rightLetters = abbreviatedName[0]
                                            } else {
                                                rightLetters = [abbreviatedName[0] + abbreviatedName[abbreviatedName.length - 1]]
                                            }

                                            let color;
                                            author.color ? color = author.color : color = "#e362e3"

                                            let profileColor = {
                                                backgroundColor: color
                                            }

                                            return (
                                                <div key={message._id} className="message-item">
                                                    <div className="author-avatar-pic" style={profileColor}>
                                                        {rightLetters}
                                                    </div>
                                                    <div className="message-body">
                                                        <div className="message-author-info">
                                                            <p className="author-name">{author.name}</p>
                                                            <p className="msg-date">{date} {houres}:{minutes}{am_pm}</p>
                                                        </div>

                                                        <div className="message-contnet">
                                                            <p>{message.content}</p>
                                                            <DeleteMessage chat={chatId} messageId={msgId} />
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            );


                                        })}
                                        {/* </ul> */}
                                        </div>
                                    </div>
                                    </div>
                                        <CreateMessage chat={chatId} />
                                </div>
                            )}}
                        </Subscription>
                    );  
                }}
                </Subscription>
            )
        }}
    </Query>
        )}
};

export default Chat;