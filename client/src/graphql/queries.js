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

