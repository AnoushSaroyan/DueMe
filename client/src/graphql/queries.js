import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
      isLoggedIn @client
    }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUserId @client
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
      color
      projects{
        _id
        name
        color
      }
      teams{
        _id
        name
        users{
          _id
          name
          color
        }
        projects{
          _id
          name
          color
          tasks{
            _id
            title
            description
            completed
            dueDate
            project{
              _id
            }
            user{
              _id
            }
          }
        }
      }
      }
    }
`;

export const FETCH_TASKS = gql`
  query FetchTasks{
    tasks {
	  _id
      description
	  dueDate
	  completed
	  project{
		_id
		name
	  }
      user{
        _id
        name
      }
    }
  }
`;

export const TASK = gql`
  query Task($_id: ID!){
	task(_id: $_id){
		_id
		description
		dueDate
    completed
    title
		project{
			_id
			name
		}
		user{
			_id
			name
		}
	}
}`;

export const FIND_PROJECT_BY_NAME = gql`
  query projectByName($name: String){
    projectByName(name: $name) {
      _id
      name
    }
  }`;

export const PROJECT = gql`
    query Project($_id: ID!){
      project(_id: $_id){
        description
        dueDate
        color
        name
        tasks{
          _id
          description
          title
          dueDate
          completed
          user{
            _id
            name
            color
          }
        }
      }
    }
`;

export const FETCH_TASK = gql`
    query Task($_id: ID!){
      task(_id: $_Id){
        _id
        title
        description
        completed
      }
    }



`

export const FETCH_MESSAGES = gql`
  query fetchMessages {
    messages {
      _id
      user {
        _id
        name
      }
      content
      date
      chat
    }
  }
`;

export const FETCH_USERS_CHAT = gql`
  query fetchUsersChat($id: ID!) {
    usersChat(_id: $id) {
      _id
      users {
        _id
        email
        name
      }
      messages {
        user {
          _id
          name
          email
          token
          loggedIn
        }
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
        user {
          _id
          name
        }
        content
        date
      }
    }
  }
`;

export const FETCH_OR_CREATE_CHAT_WITH_USER = gql`
  query FetchOrCreateChatWithUser($id: ID!) {
    fetchOrCreateChatWithUser(id: $id) {
      _id,
      users {
        _id 
        name
        email
      }
      messages {
        user {
          _id
          name
        }
        content
        date
      }
    }
  }
`;