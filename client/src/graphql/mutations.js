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
  mutation newTask($title: String!, $description: String, $dueDate: String, $completed: Boolean!, $project: ID, $user: ID!) {
    newTask(title:$title, description: $description, dueDate: $dueDate, completed: $completed, project: $project, user: $user) {
      _id
    title
	  dueDate
	  completed
    }
  }
`;
export const NEW_MESSAGE = gql`
  mutation NewMessage($user: ID!, $content: String!, $chat: ID!) {
    newMessage(user: $user, content: $content, chat: $chat) {
      _id
      users {
        _id
        email
        name
      }
      messages {
        date
        chat
        content
        user {
          _id
          name
        }
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($messageId: ID!, $currentUserId: ID!, $chat: ID!) {
    deleteMessage(messageId: $messageId, currentUserId: $currentUserId, chat: $chat) {
      _id
      users {
        _id
        email
        name
      }
      messages {
        date
        chat
        content
        user {
          _id
          name
        }
      }
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

// export const FETCH_OR_CREATE_CHAT_WITH_USER = gql`
//   mutation FetchOrCreateChatWithUser($id: ID!) {
//     fetchOrCreateChatWithUser(id: $id) {
//       _id,
//       users {
//         _id 
//         name
//         email
//       }
//       messages {
//         user {
//           _id
//           name
//         }
//         content
//         date
//       }
//     }
//   }
// `;
export const CHANGE_USER_COLOR = gql`
    mutation ChangeUserColor($_id: ID!, $color: String!){
      changeUserColor(_id: $_id, color: $color){
        _id
        color
      }
    }

`

// export const UPDATE_TASK_STATUS = gql`
//     mutation updateTaskStatus($id: ID!, $completed: Boolean!){
//       updateTaskStatus(id: $id, completed: $completed){
//         _id
//         title
//         completed
//       }
//     }


// `

export const UPDATE_TASK_STATUS = gql`
    mutation updateTaskStatus($id: ID, $completed: Boolean){
      updateTask(_id: $id, completed: $completed){
        _id
        title
        completed
      }
    }

`

export const UPDATE_TASK_TITLE = gql`
    mutation updateTaskTitle($id: ID, $title: String){
      updateTask(_id: $id, title: $title){
        _id
        title
        completed
      }
    }

`

export const UPDATE_TASK_USER = gql`
    mutation updateTaskUser($id: ID, $user: ID){
      updateTask(_id: $id, user: $user){
        _id
        title
        completed
      }
    }

`

export const UPDATE_TASK_DESCRIPTION = gql`
    mutation updateTaskDescription($id: ID, $description: String){
      updateTask(_id: $id, description: $description){
        _id
        description
        completed
      }
    }

`

export const UPDATE_TASK_DUEDATE = gql`
    mutation updateTaskDueDate($id: ID, $dueDate: String){
      updateTask(_id: $id, dueDate: $dueDate){
        _id
        description
        completed
      }
    }
`

export const UPDATE_TASK_ASSIGNEE = gql`
    mutation updateTaskAssignee($id: ID, $user: ID){
      updateTask(_id: $id, user: $user){
        _id
        description
        completed
      }
    }

`

export const DELETE_TASK = gql`
    mutation deleteTask($_id: ID){
      deleteTask(_id: $_id){
        _id
      }
    }
`

export const DELETE_PROJECT = gql`
    mutation deleteProject($_id: ID){
        deleteProject(_id: $_id){
          _id
        }
    }
`

export const DELETE_TEAM = gql`
    mutation deleteTeam($_id: ID){
      deleteTeam(_id: $_id){
        _id
      }
    }
`

export const ADD_TO_FAVORITES = gql`
    mutation addToFavorites($_id: ID, $projectId: ID){
      addToFavorites(_id: $_id, projectId: $projectId){
        _id
      }
    }
`


export const REMOVE_FROM_FAVORITES = gql`
    mutation removeFromFavorites($_id: ID, $projectId: ID){
      removeFromFavorites(_id: $_id, projectId: $projectId){
        _id
      }
    }
`

export const ADD_USER_TO_TEAM = gql`
    mutation addUserToTeam($_id: ID, $userId: ID){
      addUserToTeam(_id: $_id, userId: $userId){
        _id
      }
    }
`

export const REMOVE_USER_FROM_TEAM = gql`
    mutation removeUserFromTeam($_id: ID, $userId: ID){
      removeUserFromTeam(_id: $_id, userId: $userId){
        _id
      }
    }
`