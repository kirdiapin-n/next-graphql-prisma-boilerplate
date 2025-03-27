import { GET_ALL_POST_IDS, GET_POST_BY_ID } from "@/graphql/queries/posts";
import { getClient } from "@/lib/ssrApolloClient";
import { Card, CardContent, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

interface PostProps {
  post: Post | null;
}

export default function Post({ post }: PostProps) {
  if (!post) return null;

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {new Date(Number(post.createdAt)).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">{post.content}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const client = getClient();
    const { data } = await client.query<{ posts: { id: number }[] }>({
      query: GET_ALL_POST_IDS,
    });

    const paths = data.posts.map((post) => ({
      params: { id: post.id.toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching post IDs:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  try {
    const id = parseInt(params?.id as string, 10);
    const client = getClient();
    const { data } = await client.query<{ post: Post }>({
      query: GET_POST_BY_ID,
      variables: { id },
    });

    return {
      props: {
        post: data.post || null,
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      props: {
        post: null,
      },
    };
  }
};
