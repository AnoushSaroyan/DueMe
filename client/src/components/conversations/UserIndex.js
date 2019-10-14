import React from "react";
import './user-index.scss'
import { Query, Mutation } from "react-apollo";
import { withRouter, Link } from 'react-router-dom';
import { FETCH_USERS, FETCH_USERS_CHAT, CURRENT_USER } from "../../graphql/queries";
import { CREATE_CHAT } from '../../graphql/mutations';

class UserIndex extends React.Component {
    constructor(props) {
        super(props);
        this.handleChatCreate = this.handleChatCreate.bind(this);
        this.pushToChatShowPage = this.pushToChatShowPage.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChatCreate(createChat, userId) {
        // e.preventDefault();
        createChat({
            variables: {
                id: userId
            }
        }).then(chatData => {
            // history push to the chat show page
            this.props.history.push(`/main/chat/${chatData.createChat._id}`);
        })
    }

    pushToChatShowPage(chatId) {
        // e.preventDefault();
        this.props.history.push(`/main/chat/${chatId}`);
    }

    handleClick(e, user) {
        // e.preventDefault();
        return (
            <Query query={FETCH_USERS_CHAT} variables={{ id: user._id }}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return `Error! ${error.message}`

                    if (data.usersChat === []) {
                        return (
                            <Mutation
                                mutation={CREATE_CHAT}
                                onError={error => console.log(`Error! ${error.message}`)}
                                refetchQueries={() => [{ query: FETCH_USERS_CHAT, variables: { id: user._id } }]}
                            >
                                {(createChat, { data }) => {
                                    return (
                                        <div className="chat-user-item">
                                            <li key={user._id}>
                                                {/* <h4 onClick={e => this.handleChatCreate(e, createChat, user._id)}>{user.name}</h4> */}
                                                {this.handleChatCreate(createChat, user._id)}
                                            </li>
                                        </div>
                                    );
                                }}
                            </Mutation>
                        );
                    } else {
                        let chatyId = data.usersChat[0]._id;
                        return (
                            <div className="chat-user-item">
                                {/* <li key={user._id}>
                                    <h4 onClick={e => this.pushToChatShowPage(e, chatyId)}>{user.name}</h4>
                                </li> */}
                                {this.pushToChatShowPage(chatyId)}
                            </div>
                        );
                    }
                }}
            </Query>
        );
    }

    render() {
        return (
            <Query query={CURRENT_USER} >
                {({ data }) => {
                const currentUserId = data.currentUserId;
                return (
                    <Query query={FETCH_USERS}>
                        {({ loading, error, data }) => {
                            if (loading) return <p>Loading...</p>
                            if (error) return `Error! ${error.message}`
                            let allUsers = data.users.filter(user => user._id !== currentUserId);

                            // let member_1 = allUsers.filter(user => user.name === "member1");
                            // allUsers = member_1;
                            // debugger

                            return(
                                <div className="userIndex">
                                    <h2>Chat</h2>
                            {allUsers.map(user => {

                                // return <h4 onClick={(e) => this.handleClick(e, user)}>{user.name}</h4>
                                return <Link to={`/main/chat/${user._id}`} key={user._id}>{user.name}</Link>
                            })}
                            </div>
                            )
                                // debugger
                            // return (
                            //     <Query query={FETCH_USERS_CHAT} variables={{ id: user._id }}>
                            //         {({ loading, error, data }) => {
                            //             if (loading) return <p>Loading...</p>
                            //             // debugger
                            //             if (error) return `Error! ${error.message}`

                            //             debugger
                            //             if (data.usersChat === []) {
                            //                 debugger
                            //                 return (
                            //                     <Mutation
                            //                         mutation={CREATE_CHAT}
                            //                         onError={error => console.log(`Error! ${error.message}`)}
                            //                         refetchQueries={() => [{ query: FETCH_USERS_CHAT, variables: { id: user._id } }]}
                            //                     >
                            //                     {(createChat, { data }) => {
                            //                         return (
                            //                             <div className="chat-user-item">
                            //                                 <li key={user._id}>
                            //                                     <h4 onClick={e => this.handleChatCreate(e, createChat, user._id)}>{user.name}</h4>
                            //                                 </li>
                            //                             </div>
                            //                         );
                            //                     }}
                            //                     </Mutation>
                            //                 );
                            //             } else {
                            //                 debugger
                            //                 let chatyId = data.usersChat[0]._id; 
                            //                 return (
                            //                     <div className="chat-user-item">
                            //                         <li key={user._id}>
                            //                             <h4 onClick={e => this.pushToChatShowPage(e, chatyId)}>{user.name}</h4>
                            //                         </li>
                            //                     </div>
                            //                 );
                            //             } 
                            //         }}
                            //     </Query>
                            // )}
                                // )}
                            // </div>
                            // );
                        }}
                    </Query>  
                )
                }}
            </Query>    
        );   
    }
}

export default withRouter(UserIndex);



    // chatExists(currentUserId) {
    //     return (
    //         <Query query={FETCH_USER_CHATS} variables={{ id: currentUserId }}>
    //             {({ loading, error, data }) => {
    //                 if (loading) return <p>Loading...</p>
    //                 if (error) return `Error! ${error.message}`

    //                 const buddies = data.fetchUserChats.map(chat => {
    //                     return chat.users[1]._id;
    //                 });
    //                 debugger
    //                 <div>
    //                     {buddies}
    //                 </div> ;
    //             }}
    //         </Query>
    //     );
    // }
    // render() {
    //     return (
    //         <Query query={CURRENT_USER} >
    //             {({ data }) => {  
    //                 const currentUserId = data.currentUserId;
    //                 return (
    //                     <Query query={FETCH_USERS}>
    //                         {({ loading, error, data }) => {
    //                             if (loading) return <p>Loading...</p>
    //                             if (error) return `Error! ${error.message}`

    //                             let allUsersData = data;
                                
    //                             // let userList = allUsersData.users.map(user => <li>{user.name}</li>);
    //                             // return <div>
    //                             //     {userList}
    //                             // </div>
    //                             // let buddies = this.chatExists(currentUser._id);
    //                             // debugger
    //                             return(
    //                                 <Query query={FETCH_USERS_CHAT} variables={{ id: user._id }}>
    //                                     {({ loading, error, data }) => {
    //                                         if (loading) return <p>Loading...</p>
    //                                         if (error) return `Error! ${error.message}`

    //                                         let buddies = data.fetchUserChats.map(chat => {
    //                                             return chat.users[1]._id;
    //                                         });

    //                                         debugger
                                            
    //                                         allUsersData.users.map(user => {
    //                                             if (!buddies.includes(user)) {
    //                                                 return (
    //                                                     <Mutation
    //                                                         mutation={CREATE_CHAT}
    //                                                         onError={error => console.log(`Error! ${error.message}`)}
    //                                                         refetchQueries={() => [{ query: FETCH_USER_CHATS, variables: { id: currentUserId } }]}
    //                                                     >
    //                                                         {(createChat, { data }) => {
    //                                                             return (
    //                                                                 <div className="chat-user-item">
    //                                                                     <li key={user._id}>
    //                                                                         <h4 onClick={e => this.handleChatCreate(e, createChat, user._id)}>{user.name}</h4>
    //                                                                     </li>
    //                                                                 </div>
    //                                                             )
    //                                                         }}
    //                                                     </Mutation>
    //                                                 );
    //                                             }
    //                                             // else {
    //                                             //     // needs some work, gonna refactor FETCH_CHAT to get the participants ids, ie the currentUserID and the user._id and then return the chat based on that input
    //                                             //     // so don't test this out yet
    //                                             //     <Query query={FETCH_CHAT}>
    //                                             //         {(fetchChat, { data }) => {
    //                                             //             return (
    //                                             //                 <div className="chat-user-item">
    //                                             //                     <li key={user._id}>
    //                                             //                         <h4 onClick={e => this.handleChatFetch(e, createChat, user._id)}>{user.name}</h4>
    //                                             //                     </li>
    //                                             //                 </div>
    //                                             //             )
    //                                             //         }}
    //                                             //     </Query>
    //                                             // }
    //                                         })
    //                                     }}
    //                                 </Query>
    //                             )
                                
    //                             // go over each user and check if chat exists between a user and the current user
    //                             // return either a mutation to create a new chat or to fetch an already existing chat
                                

    //                         }}
    //                     </Query>
    //                 );   
    //             }}
    //         </Query>
    //     );

    // }

    // fackrender() {
    //     return (
    //         <Query query={CURRENT_USER}>
    //             {({ data }) => {  
    //                 const currentUserId = data.currentUserId;
                    
    //                 return (
    //                     <Mutation
    //                         mutation={CREATE_CHAT}
    //                         onError={error => console.log(`Error! ${error.message}`)}
    //                         refetchQueries={() => [{ query: FETCH_USER_CHATS, variables: { id: currentUserId } }]}
    //                     >
    //                         {(createChat, { data }) => {
    //                             let user = {
    //                                 name: "member1",
    //                                 _id: "5d97cc029004c089d3fcd9be"
    //                             }
    //                             return (
    //                                 <div className="chat-user-item">
    //                                     <li key={user._id}>
    //                                         <h4 onClick={e => this.handleChatCreate(e, createChat, user._id)}>{user.name}</h4>
    //                                     </li>
    //                                 </div>
    //                             )
    //                         }}
    //                     </Mutation>
    //                 ); 
    //             }} 
    //         </Query>
    //     ) 
    // }


// render() {
    //     return (
    //         <Query query={FETCH_USERS}>
    //             {({ loading, error, data }) => {
    //                 if (loading) return <p>Loading...</p>
    //                 if (error) return `Error! ${error.message}`

    //                 let allUsersData = data;
    //                 return allUsersData.users.map(user => {
    //                     return (
    //                         <div className="chat-user-item">
    //                             <li key={user._id}>
    //                                 {/* onClick={e => this.handleChatCreate(e, createChat, user._id)} */}
    //                                 <h4>{user.name}</h4>
    //                             </li>
    //                         </div>
    //                     ); 
    //                 })
    //             }}
    //         </Query>        
    //     );
    // }

    // updateCache(cache, { data }) {
    //     let products;
    //     try {
    //         // if we've already fetched the products then we can read the
    //         // query here
    //         products = cache.readQuery({ query: FETCH_PRODUCTS });
    //     } catch (err) {
    //         return;
    //     }
    //     // if we had previously fetched products we'll add our new product to our cache
    //     if (products) {
    //         let productArray = products.products;
    //         let newProduct = data.newProduct;
    //         cache.writeQuery({
    //             query: FETCH_PRODUCTS,
    //             data: { products: productArray.concat(newProduct) }
    //         });
    //     }
    // }
