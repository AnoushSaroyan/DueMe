import gql from 'graphql-tag';


export const LOGIN_USER = gql `
    mutation LoginUser($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            loggedIn
        }
    }
`;

export const VERIFY_USER = gql `
    mutation VerifyUser($token: String!){
        verifyUser(token: $token){
            loggedIn
        }
    }
`;

export const REGISTER_USER = gql `
    mutation RegisterUser($email: String!, $password: String!, $name: String!){
        register(email: $email, password: $password, name: $name){
            token
            email
            loggedIn
            name
        }
    }
`;

export const NEW_MESSAGE = gql`
    mutation NewMessage($user: ID!, $content: String!, $chat: ID!) {
      newMessage(user: $user, content: $content, chat: $chat) {
        _id
        content
        user
        date
        chat
      }
    }
  `;

export const DELETE_MESSAGE = gql`
    mutation DeleteMessage($id: ID!) {
      deleteMessage(id: $id) {
        _id
      }
    }
  `;

export const CREATE_CHAT = gql`
    mutation CreateChat($id: ID!) {
      createChat(id: $id) {
        _id
      }
    }
  `;  
