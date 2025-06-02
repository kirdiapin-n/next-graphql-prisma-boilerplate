import { gql } from "graphql-tag";

export const CREATE_USER = gql`
  mutation createUser($email: String!, $name: String!, $password: String!) {
    createUser(name: $name, password: $password, email: $email) {
      id
      name
      email
    }
  }
`;
