import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User($id: ID!) {
    user(_id: $id) {
      email
      name
      password
    }
  }
`;

export const QUERY_USERS = gql`
query GetAllUsers {
    getAllUsers {
      email
      name
      password
    }
  }
`;

export const QUERY_STORY = gql`
query Story($id: ID!) {
    story(_id: $id) {
      description
      image
      title
      userId {
        _id
        name
        email
      }
    }
  }
`;
export const QUERY_STORIES = gql`
query Stories {
    stories {
      description
      image
      title
      userId {
        email
        name
      }
    }
  }
`;
export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      stories {
        _id
        title
        description
        image
      }
    }
  }
`;
