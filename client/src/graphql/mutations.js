import gql from 'graphql-tag';


export const LOGIN_USER = gql `
    mutation LoginUser($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            loggedIn
            _id
        }
    }
`;

export const LOGOUT_USER = gql`
    mutation LogoutUser($_id: ID!){
        logout(_id: $_id){
            _id
        }
    }
`;

export const VERIFY_USER = gql `
    mutation VerifyUser($token: String!){
        verifyUser(token: $token){
            loggedIn
            _id
        }
    }
`;

export const REGISTER_USER = gql `
    mutation RegisterUser($email: String!, $password: String!, $name: String!){
        register(email: $email, password: $password, name: $name){
            _id
            token
            email
            loggedIn
            name
        }
    }
`;

export const CREATE_TEAM = gql`
  mutation newTeam($name: String!, $users: [ID]) {
    newTeam(name: $name, users: $users) {
      _id
      name
      users{
        _id
        name
      }
    }
  }
`;


