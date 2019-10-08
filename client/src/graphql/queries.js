import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
      isLoggedIn @client
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

export const FETCH_USERS = gql`
  query fetchUsers {
    users {
      _id
      email
      name
    }
  }
`;