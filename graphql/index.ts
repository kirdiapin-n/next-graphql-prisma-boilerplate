import { IRoles } from "@/graphql/types";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { gql } from "graphql-tag";

const prisma = new PrismaClient().$extends(withAccelerate());

interface Auth0UserResponse {
  message: string;
  data?: {
    user_id: string;
    email: string;
    name: string;
  };
  error?: string;
}

export const typeDefs = gql`
  enum Roles {
    Admin
    User
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    createdAt: String!
  }

  type User {
    id: Int!
    name: String!
    auth0Id: String!
    email: String!
    roles: [Roles!]!
  }

  type Result {
    success: Boolean!
  }

  type Query {
    posts: [Post!]!
    post(id: Int!): Post!
    searchPosts(term: String!): [Post!]!
    users: [User!]!
    user(auth0Id: String!): User
  }

  type Mutation {
    createPost(title: String!, content: String!): Post!
    deletePost(id: Int!): Result!
    createUser(name: String!, email: String!, password: String!): User!
  }
`;

export const resolvers = {
  Query: {
    posts: async () => {
      return prisma.post.findMany();
    },
    post: async (_: any, { id }: { id: number }) => {
      const post = await prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new Error(`Post with ID ${id} not found`);
      }
      return post;
    },
    searchPosts: async (_: any, { term }: { term: string }) => {
      return prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: term, mode: "insensitive" } },
            { content: { contains: term, mode: "insensitive" } },
          ],
        },
      });
    },
    users: async () => {
      return prisma.user.findMany();
    },
    user: async (_: any, { auth0Id }: { auth0Id: string }) => {
      return prisma.user.findUnique({ where: { auth0Id } });
    },
  },
  Mutation: {
    createPost: async (_: any, { title, content }: { title: string; content: string }) => {
      return prisma.post.create({
        data: { title, content },
      });
    },
    deletePost: async (_: any, { id }: { id: number }) => {
      const post = await prisma.post.findUnique({ where: { id } });
      if (!post) throw new Error(`Post with ID ${id} not found`);

      const data = await prisma.post.delete({ where: { id } });

      return { success: Boolean(data) };
    },
    createUser: async (_: any, { name, email, password }: { name: string; email: string; password: string }) => {
      const auth0User = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      }).then((res): Promise<Auth0UserResponse> => res.json());

      if (auth0User.error) throw new Error(auth0User.error);

      if (!auth0User.data) return;

      return await prisma.user.create({
        data: {
          auth0Id: auth0User.data?.user_id,
          name,
          email,
          roles: [IRoles.User],
        },
      });
    },
  },
};
