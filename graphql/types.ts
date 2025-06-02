export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
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
  email: Scalars["String"]["input"];
}

export interface IResult {
  success: Scalars["Boolean"]["output"];
}

export enum IRoles {
  Admin = "Admin",
  User = "User",
}

export interface IUser {
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

export type ICreateUserMutation = { createUser: { id: number; name: string; email: string } };

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
  email: Scalars["String"]["input"];
}>;

export type IGetUserQuery = { user?: { name: string; email: string; id: number; roles: Array<IRoles> } | null };
