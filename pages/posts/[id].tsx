import { DELETE_POST } from "@/graphql/mutations/posts";
import { GET_POST_BY_ID } from "@/graphql/queries/posts";
import {
  IDeletePostMutation,
  IDeletePostMutationVariables,
  IGetPostQuery,
  IGetPostQueryVariables,
} from "@/graphql/types";
import { getClient } from "@/lib/ssrApolloClient";
import { useMutation } from "@apollo/client";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

export default function Post({ post }: IGetPostQuery) {
  const { push } = useRouter();
  const [mutate] = useMutation<IDeletePostMutation, IDeletePostMutationVariables>(DELETE_POST);

  const handleDelete = async () => {
    const { data } = await mutate({ variables: { id: post.id } });

    if (data?.deletePost.success) await push("/");
  };

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

        <CardActions>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IGetPostQuery> = async ({ params }) => {
  try {
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
  } catch (e) {
    return { notFound: true };
  }
};
