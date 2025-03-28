import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      createdAt
    }
  }
`;

export const GET_ALL_POST_IDS = gql`
  query GetPostIds {
    posts {
      id
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
      id
      title
      content
      createdAt
    }
  }
`;

export const SEARCH_POSTS = gql`
  query SearchPosts($term: String!) {
    searchPosts(term: $term) {
      id
      title
      content
      createdAt
    }
  }
`;
