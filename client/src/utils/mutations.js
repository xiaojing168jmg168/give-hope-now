import { gql } from'@apollo/client';

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
    `;

export const UPDATE_USER = gql`
mutation UpdateUser($name: String, $email: String, $password: String) {
    updateUser(name: $name, email: $email, password: $password) {
      email
      name
      password
    }
  }
    `;

export const DELETE_USER = gql`
mutation DeleteUser {
    deleteUser {
      _id
      email
      name
      password
    }
  }
`;

export const ADD_STORY = gql`
 mutation AddStory($title: String!, $description: String!, $image: String, $userId: ID) {
  addStory(title: $title, description: $description, image: $image, userId: $userId) {
    description
    title
    image
    _id
    userId {
      _id
    }
  }
}
`;

export const UPDATE_STORY = gql`
mutation UpdateStory($id: ID!,$description: String, $image: String, $title: String) {
    updateStory(_id: $id, description: $description, image: $image, title: $title) {
      _id
      description
      image
      title
      userId {
        _id
      }
    }
  }
`;

export const DELETE_STORY = gql`
mutation DeleteStory($id: ID!) {
    deleteStory(_id: $id) {
      _id
      description
      image
      title
      userId {
        _id
      }
    }
  }
`