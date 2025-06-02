import { gql } from "graphql-tag";

export const GET_USER = gql`
  query getUser($email: String!) {
    user(email: $email) {
      name
      email
      id
      roles
    }
  }
`;
