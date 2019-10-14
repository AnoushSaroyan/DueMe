import gql from "graphql-tag";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
subscription onMessageSent {
      messageSent {
        # _id
        # user {
        #   _id
        #   name
        # }
        # content
        # date
        # chat

        _id
        users {
          _id
          email
          name
        }
        messages {
          _id
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

export const DELETED_MESSAGE_SUBSCRIPTION = gql`
subscription onMessageDeleted {
      messageDeleted {
        # _id
        # user {
        #   _id
        #   name
        # }
        # content
        # date
        # chat
        _id
        users {
          _id
          email
          name
        }
        messages {
          _id
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