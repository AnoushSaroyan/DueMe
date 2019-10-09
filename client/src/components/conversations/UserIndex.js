import React from "react";
import { Query, Mutation } from "react-apollo";
import { withRouter } from "react-router";
import { FETCH_USERS, FETCH_USER_CHATS, FETCH_CHAT, USER } from "../../graphql/queries";
import { CREATE_CHAT } from '../../graphql/mutations';;

class UserIndex extends React.Component {
    constructor(props) {
        super(props);
        this.handleChatCreate = this.handleChatCreate.bind(this);
        // this.chatExists = this.chatExists.bind(this);
    }

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

    handleChatCreate(e, createChat, userId) {
        e.preventDefault();
        createChat({
            variables: {
                id: userId
            }
        }).then(data => {
            // history push
            this.props.history.push("/");
        })
    }

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
    //     if (!localStorage.getItem("currentUserId")) {
    //         return <div></div>
    //     }
    //     return (
    //         <Query query={USER} variables={{ _id: localStorage.getItem("currentUserId") }}>
    //             {({ data }) => {  
    //                 if (data) {
    //                     const currentUser = data.user;
    //                     return (
    //                         <Query query={FETCH_USERS}>
    //                             {({ loading, error, data }) => {
    //                                 if (loading) return <p>Loading...</p>
    //                                 if (error) return `Error! ${error.message}`

    //                                 let allUsersData = data;
                                    
    //                                 // let userList = allUsersData.users.map(user => <li>{user.name}</li>);
    //                                 // return <div>
    //                                 //     {userList}
    //                                 // </div>
    //                                 // let buddies = this.chatExists(currentUser._id);
    //                                 // debugger
    //                                 return(
    //                                     <Query query={FETCH_USER_CHATS} variables={{ id: currentUser._id }}>
    //                                         {({ loading, error, data }) => {
    //                                             if (loading) return <p>Loading...</p>
    //                                             if (error) return `Error! ${error.message}`

    //                                             let buddies = data.fetchUserChats.map(chat => {
    //                                                 return chat.users[1]._id;
    //                                             });

    //                                             debugger
                                                
    //                                             allUsersData.users.map(user => {
    //                                                 if (!buddies.includes(user)) {
    //                                                     return (
    //                                                         <Mutation
    //                                                             mutation={CREATE_CHAT}
    //                                                             onError={error => console.log(`Error! ${error.message}`)}
    //                                                             refetchQueries={() => [{ query: FETCH_USER_CHATS, variables: { id: currentUser._id } }]}
    //                                                         >
    //                                                             {(createChat, { data }) => {
    //                                                                 return (
    //                                                                     <div className="chat-user-item">
    //                                                                         <li key={user._id}>
    //                                                                             <h4 onClick={e => this.handleChatCreate(e, createChat, user._id)}>{user.name}</h4>
    //                                                                         </li>
    //                                                                     </div>
    //                                                                 )
    //                                                             }}
    //                                                         </Mutation>
    //                                                     );
    //                                                 }
    //                                                 // else {
    //                                                 //     // needs some work, gonna refactor FETCH_CHAT to get the participants ids, ie the currentUserID and the user._id and then return the chat based on that input
    //                                                 //     // so don't test this out yet
    //                                                 //     <Query query={FETCH_CHAT}>
    //                                                 //         {(fetchChat, { data }) => {
    //                                                 //             return (
    //                                                 //                 <div className="chat-user-item">
    //                                                 //                     <li key={user._id}>
    //                                                 //                         <h4 onClick={e => this.handleChatFetch(e, createChat, user._id)}>{user.name}</h4>
    //                                                 //                     </li>
    //                                                 //                 </div>
    //                                                 //             )
    //                                                 //         }}
    //                                                 //     </Query>
    //                                                 // }
    //                                             })
    //                                         }}
    //                                     </Query>
    //                                 )
                                    
    //                                 // go over each user and check if chat exists between a user and the current user
    //                                 // return either a mutation to create a new chat or to fetch an already existing chat
                                    

    //                             }}
    //                         </Query>
    //                     );
    //                 } else { 
    //                     return <div></div>
    //                 }    
    //             }}
    //         </Query>
    //     );

    // }

    render() {
        if (!localStorage.getItem("currentUserId")) {
            return <div></div>
        }
        return (
            <Query query={USER} variables={{ _id: localStorage.getItem("currentUserId") }}>
                {({ data }) => {  
                    if (data) {
                        const currentUser = data.user;
                        return (
                            <Mutation
                                mutation={CREATE_CHAT}
                                onError={error => console.log(`Error! ${error.message}`)}
                                refetchQueries={() => [{ query: FETCH_USER_CHATS, variables: { id: currentUser._id } }]}
                            >
                                {(createChat, { data }) => {
                                    let user = {
                                        name: "member1",
                                        _id: "5d97cc029004c089d3fcd9be"
                                    }
                                    return (
                                        <div className="chat-user-item">
                                            <li key={user._id}>
                                                <h4 onClick={e => this.handleChatCreate(e, createChat, user._id)}>{user.name}</h4>
                                            </li>
                                        </div>
                                    )
                                }}
                            </Mutation>
                        );
                    } else {
                        return <div></div>
                    } 
                }} 
            </Query>
        ) 
    }
}

export default withRouter(UserIndex);