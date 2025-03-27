import { PrismaClient } from "@prisma/client";
import { gql } from "graphql-tag";

const prisma = new PrismaClient();

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
  },
  Mutation: {
    createPost: async (_: any, { title, content }: { title: string; content: string }) => {
      return prisma.post.create({
        data: { title, content },
      });
    },
  },
};
