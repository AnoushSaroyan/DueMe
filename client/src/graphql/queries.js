import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
      isLoggedIn @client
    }
`;

export const USER = gql`
    query User($_id: ID!){
      user(_id: $_id){
      _id
      name
      email
      }
    }
`