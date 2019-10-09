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
  mutation newTeam($name: String!, $users: [String]) {
    newTeam(name: $name, users: $users) {
      _id
      name
      users{
        _id
        name
        email
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation newProject($name: String!, $description: String!, $dueDate: String!, $team: ID!, $color: String!) {
    newProject(name: $name, description: $description, dueDate: $dueDate, team: $team, color: $color) {
      _id
      name
      description
      dueDate
      team{
        name
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation newTask($description: String!, $dueDate: String!, $completed: Boolean!, $project: ID!, $user: ID!) {
    newTask(description: $description, dueDate: $dueDate, completed: $completed, project: $project, user: $user) {
      _id
	  description
	  dueDate
	  completed
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
