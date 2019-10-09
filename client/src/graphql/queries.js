import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
      isLoggedIn @client
    }
`;

export const FETCH_USERS = gql`
  query FetchUsers{
    users {
      _id
      name
      email
    }
  }`;

export const FIND_USER_BY_EMAIL = gql`
  query userByEmail($email: String){
    userByEmail(email: $email) {
      _id
      name
      email
    }
  }`;

export const USER = gql`
    query User($_id: ID!){
      user(_id: $_id){
      _id
      name
      email
      }
    }
`;

export const PROJECT = gql`
    query Project($_id: ID!){
      user(_id: $_id){
      _id
      name
	  description
	  dueDate
	  team
      }
    }
`;

export const FETCH_MESSAGES = gql`
  query fetchMessages {
    messages {
      _id
      user
      content
      date
      chat
    }
  }
`;

export const FETCH_USER_CHATS = gql`
  query fetchUserChats($id: ID!) {
    userChats(_id: $id) {
      _id
      users {
        _id
        email
        name
      }
      messages {
        user
        content
        date
      }
    }
  }
`;


export const FETCH_CHAT = gql`
  query fetchChat($id: ID!) {
    chat(_id: $id) {
      _id,
      users {
        _id 
        name
        email
      }
      messages {
        user
        content
        date
      }
    }
  }
`;