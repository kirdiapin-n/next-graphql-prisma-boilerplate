import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { gql } from "graphql-tag";

const prisma = new PrismaClient().$extends(withAccelerate());

export const typeDefs = gql`
  type Post {
    id: Int!
    title: String!
    content: String!
    createdAt: String!
  }

  type Query {
    posts: [Post!]!
    post(id: Int!): Post!
    searchPosts(term: String!): [Post!]!
  }

  type Mutation {
    createPost(title: String!, content: String!): Post!
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
  },
  Mutation: {
    createPost: async (_: any, { title, content }: { title: string; content: string }) => {
      return prisma.post.create({
        data: { title, content },
      });
    },
  },
};
