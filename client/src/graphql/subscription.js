import gql from "graphql-tag";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
subscription onMessageSent {
      messageSent {
        _id
        user
        content
        date
        chat
      }
    }
`;

export const DELETED_MESSAGE_SUBSCRIPTION = gql`
subscription onMessageDeleted {
      messageDeleted {
        _id
        user
        content
        date
        chat
      }
    }
`;