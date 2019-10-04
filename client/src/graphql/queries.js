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