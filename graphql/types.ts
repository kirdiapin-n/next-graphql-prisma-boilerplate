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
  createUser: IUser;
  deletePost: IResult;
}

export interface IMutationCreatePostArgs {
  content: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
}

export interface IMutationCreateUserArgs {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}

export interface IMutationDeletePostArgs {
  id: Scalars["Int"]["input"];
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
  searchPosts: Array<IPost>;
  user?: Maybe<IUser>;
  users: Array<IUser>;
}

export interface IQueryPostArgs {
  id: Scalars["Int"]["input"];
}

export interface IQuerySearchPostsArgs {
  term: Scalars["String"]["input"];
}

export interface IQueryUserArgs {
  auth0Id: Scalars["String"]["input"];
}

export interface IResult {
  success: Scalars["Boolean"]["output"];
}

export enum IRoles {
  Admin = "Admin",
  User = "User",
}

export interface IUser {
  auth0Id: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  roles: Array<IRoles>;
}

export type ICreatePostMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  content: Scalars["String"]["input"];
}>;

export type ICreatePostMutation = { createPost: { id: number; title: string; content: string; createdAt: string } };

export type IDeletePostMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type IDeletePostMutation = { deletePost: { success: boolean } };

export type ICreateUserMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type ICreateUserMutation = { createUser: { id: number; auth0Id: string; name: string; email: string } };

export type IGetPostsQueryVariables = Exact<{ [key: string]: never }>;

export type IGetPostsQuery = { posts: Array<{ id: number; title: string; content: string; createdAt: string }> };

export type IGetPostIdsQueryVariables = Exact<{ [key: string]: never }>;

export type IGetPostIdsQuery = { posts: Array<{ id: number }> };

export type IGetPostQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type IGetPostQuery = { post: { id: number; title: string; content: string; createdAt: string } };

export type ISearchPostsQueryVariables = Exact<{
  term: Scalars["String"]["input"];
}>;

export type ISearchPostsQuery = {
  searchPosts: Array<{ id: number; title: string; content: string; createdAt: string }>;
};

export type IGetUserQueryVariables = Exact<{
  auth0Id: Scalars["String"]["input"];
}>;

export type IGetUserQuery = { user?: { name: string; email: string; id: number; roles: Array<IRoles> } | null };

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
export const DeletePostDocument = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id) {
      success
    }
  }
`;
export type IDeletePostMutationFn = Apollo.MutationFunction<IDeletePostMutation, IDeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<IDeletePostMutation, IDeletePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IDeletePostMutation, IDeletePostMutationVariables>(DeletePostDocument, options);
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<IDeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<IDeletePostMutation, IDeletePostMutationVariables>;
export const CreateUserDocument = gql`
  mutation createUser($email: String!, $name: String!, $password: String!) {
    createUser(name: $name, password: $password, email: $email) {
      id
      auth0Id
      name
      email
    }
  }
`;
export type ICreateUserMutationFn = Apollo.MutationFunction<ICreateUserMutation, ICreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<ICreateUserMutation, ICreateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ICreateUserMutation, ICreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<ICreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<ICreateUserMutation, ICreateUserMutationVariables>;
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
export const SearchPostsDocument = gql`
  query SearchPosts($term: String!) {
    searchPosts(term: $term) {
      id
      title
      content
      createdAt
    }
  }
`;

/**
 * __useSearchPostsQuery__
 *
 * To run a query within a React component, call `useSearchPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPostsQuery({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useSearchPostsQuery(
  baseOptions: Apollo.QueryHookOptions<ISearchPostsQuery, ISearchPostsQueryVariables> &
    ({ variables: ISearchPostsQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ISearchPostsQuery, ISearchPostsQueryVariables>(SearchPostsDocument, options);
}
export function useSearchPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ISearchPostsQuery, ISearchPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ISearchPostsQuery, ISearchPostsQueryVariables>(SearchPostsDocument, options);
}
export function useSearchPostsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ISearchPostsQuery, ISearchPostsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ISearchPostsQuery, ISearchPostsQueryVariables>(SearchPostsDocument, options);
}
export type SearchPostsQueryHookResult = ReturnType<typeof useSearchPostsQuery>;
export type SearchPostsLazyQueryHookResult = ReturnType<typeof useSearchPostsLazyQuery>;
export type SearchPostsSuspenseQueryHookResult = ReturnType<typeof useSearchPostsSuspenseQuery>;
export type SearchPostsQueryResult = Apollo.QueryResult<ISearchPostsQuery, ISearchPostsQueryVariables>;
export const GetUserDocument = gql`
  query getUser($auth0Id: String!) {
    user(auth0Id: $auth0Id) {
      name
      email
      id
      roles
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      auth0Id: // value for 'auth0Id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<IGetUserQuery, IGetUserQueryVariables> &
    ({ variables: IGetUserQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetUserQuery, IGetUserQueryVariables>(GetUserDocument, options);
}
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetUserQuery, IGetUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetUserQuery, IGetUserQueryVariables>(GetUserDocument, options);
}
export function useGetUserSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IGetUserQuery, IGetUserQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<IGetUserQuery, IGetUserQueryVariables>(GetUserDocument, options);
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<IGetUserQuery, IGetUserQueryVariables>;
