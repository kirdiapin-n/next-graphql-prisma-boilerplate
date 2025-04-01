import { GET_ALL_POST_IDS, GET_POST_BY_ID } from "@/graphql/queries/posts";
import { IGetPostQuery, IGetPostQueryVariables } from "@/graphql/types";
import { getClient } from "@/lib/ssrApolloClient";
import { Card, CardContent, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps<IGetPostQuery> = async ({ params }) => {
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
