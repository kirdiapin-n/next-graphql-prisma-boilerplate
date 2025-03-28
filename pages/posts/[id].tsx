import { GET_ALL_POST_IDS, GET_POST_BY_ID } from "@/graphql/queries/posts";
import { IGetPostQuery, IGetPostQueryVariables } from "@/graphql/types";
import { getClient } from "@/lib/ssrApolloClient";
import { Card, CardContent, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

export default function Post({ post }: IGetPostQuery) {
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

export const getStaticProps: GetStaticProps<IGetPostQuery> = async ({ params }) => {
  const id = parseInt(params?.id as string, 10);
  const client = getClient();
  const { data } = await client.query<IGetPostQuery, IGetPostQueryVariables>({
    query: GET_POST_BY_ID,
    variables: { id },
  });

  return {
    props: {
      post: data.post,
    },
  };
};
