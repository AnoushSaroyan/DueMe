import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { NEW_MESSAGE } from "../../graphql/mutations";
import { CURRENT_USER, FETCH_CHAT } from "../../graphql/queries";
import { Query } from "react-apollo";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class CreateMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { content: "" };
        this.addEmoji = this.addEmoji.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e, newMessage, currentUserId) {
        e.preventDefault();
        // debugger
        newMessage({
            variables: {
                content: this.state.content,
                user: currentUserId,
                chat: this.props.chat
            }
        });

        this.setState({
            content: ""
        });
    }

    // we need to remember to update our cache directly with our new message
    updateCache(cache, { data }) {
        
        let query;
        let messages;
        try {
            // if we've already fetched the products then we can read the
            // query here
            
            query = cache.readQuery({ query: FETCH_CHAT, variables: { id: this.props.chat }});
            messages = query.chat.messages;
            
        } catch (err) {
            
            return;
        }
        // if we had previously fetched messages we'll add our new message to our cache
        if (messages) {
            
            // let messageArray = messages;
            let newMessage = data.newMessage;
            messages.push(newMessage);
            cache.writeQuery({
                query: FETCH_CHAT,
                data: { chat: { messages } }
            });
            let anotherQuery = cache.readQuery({ query: FETCH_CHAT, variables: { id: this.props.chat } });
            
        }
    }

    addEmoji(e) {
        //console.log(e.native)
        let emoji = e.native;
        this.setState({
            content: this.state.content + emoji
        })
    }

    render() {
        return (
            <Query query={CURRENT_USER} >
                {({ data }) => {
                    const currentUserId = data.currentUserId;
                    return (
                        <Mutation 
                            mutation={NEW_MESSAGE} 
                            // update={(cache, data) => this.updateCache(cache, data)} 
                            refetchQueries={() => [{ query: FETCH_CHAT, variables: { id: this.props.chat } }]}
                            >
         
                            {(newMessage, { data }) => (
                                <div>
                                    <form onSubmit={e => this.handleSubmit(e, newMessage, currentUserId)}>
                                        <input
                                            onChange={this.update("content")}
                                            value={this.state.content}
                                            placeholder="Send a message"
                                        />
                                    </form>
                                    <Picker onSelect={this.addEmoji} style={{ position: 'absolute', bottom: '20px', right: '20px' }}/>
                                </div>
                            )
                            }
                        </Mutation>
                    );      
                }}
            </Query>   
        );
    }
}

export default withRouter(CreateMessage);