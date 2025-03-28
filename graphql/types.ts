import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
}

export interface IMutation {
  createPost: IPost;
}

export interface IMutationCreatePostArgs {
  content: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
}

export interface IPost {
  content: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
}

export interface IQuery {
  post: IPost;
  posts: Array<IPost>;
}

export interface IQueryPostArgs {
  id: Scalars["Int"]["input"];
}

export type ICreatePostMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  content: Scalars["String"]["input"];
}>;

export type ICreatePostMutation = { createPost: { id: number; title: string; content: string; createdAt: string } };

export type IGetPostsQueryVariables = Exact<{ [key: string]: never }>;

export type IGetPostsQuery = { posts: Array<{ id: number; title: string; content: string; createdAt: string }> };

export type IGetPostIdsQueryVariables = Exact<{ [key: string]: never }>;

export type IGetPostIdsQuery = { posts: Array<{ id: number }> };

export type IGetPostQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type IGetPostQuery = { post: { id: number; title: string; content: string; createdAt: string } };

export const CreatePostDocument = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
      createdAt
    }
  }
`;
export type ICreatePostMutationFn = Apollo.MutationFunction<ICreatePostMutation, ICreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<ICreatePostMutation, ICreatePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ICreatePostMutation, ICreatePostMutationVariables>(CreatePostDocument, options);
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<ICreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<ICreatePostMutation, ICreatePostMutationVariables>;
export const GetPostsDocument = gql`
  query GetPosts {
    posts {
      id
      title
      content
      createdAt
    }
  }
`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<IGetPostsQuery, IGetPostsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetPostsQuery, IGetPostsQueryVariables>(GetPostsDocument, options);
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IGetPostsQuery, IGetPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetPostsQuery, IGetPostsQueryVariables>(GetPostsDocument, options);
}
export function useGetPostsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IGetPostsQuery, IGetPostsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<IGetPostsQuery, IGetPostsQueryVariables>(GetPostsDocument, options);
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<IGetPostsQuery, IGetPostsQueryVariables>;
export const GetPostIdsDocument = gql`
  query GetPostIds {
    posts {
      id
    }
  }
`;

/**
 * __useGetPostIdsQuery__
 *
 * To run a query within a React component, call `useGetPostIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostIdsQuery(baseOptions?: Apollo.QueryHookOptions<IGetPostIdsQuery, IGetPostIdsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetPostIdsQuery, IGetPostIdsQueryVariables>(GetPostIdsDocument, options);
}
export function useGetPostIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IGetPostIdsQuery, IGetPostIdsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetPostIdsQuery, IGetPostIdsQueryVariables>(GetPostIdsDocument, options);
}
export function useGetPostIdsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IGetPostIdsQuery, IGetPostIdsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<IGetPostIdsQuery, IGetPostIdsQueryVariables>(GetPostIdsDocument, options);
}
export type GetPostIdsQueryHookResult = ReturnType<typeof useGetPostIdsQuery>;
export type GetPostIdsLazyQueryHookResult = ReturnType<typeof useGetPostIdsLazyQuery>;
export type GetPostIdsSuspenseQueryHookResult = ReturnType<typeof useGetPostIdsSuspenseQuery>;
export type GetPostIdsQueryResult = Apollo.QueryResult<IGetPostIdsQuery, IGetPostIdsQueryVariables>;
export const GetPostDocument = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
      id
      title
      content
      createdAt
    }
  }
`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(
  baseOptions: Apollo.QueryHookOptions<IGetPostQuery, IGetPostQueryVariables> &
    ({ variables: IGetPostQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetPostQuery, IGetPostQueryVariables>(GetPostDocument, options);
}
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetPostQuery, IGetPostQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetPostQuery, IGetPostQueryVariables>(GetPostDocument, options);
}
export function useGetPostSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IGetPostQuery, IGetPostQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<IGetPostQuery, IGetPostQueryVariables>(GetPostDocument, options);
}
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostSuspenseQueryHookResult = ReturnType<typeof useGetPostSuspenseQuery>;
export type GetPostQueryResult = Apollo.QueryResult<IGetPostQuery, IGetPostQueryVariables>;
