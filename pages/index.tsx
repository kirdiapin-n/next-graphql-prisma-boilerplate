import Form from "@/components/posts/Form";
import { GET_POSTS } from "@/graphql/queries/posts";
import { IGetPostsQuery } from "@/graphql/types";
import { getClient } from "@/lib/ssrApolloClient";
import { useQuery } from "@apollo/client";
import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";

export default function HomePage({ posts: initialPosts }: IGetPostsQuery) {
  const { data } = useQuery<IGetPostsQuery>(GET_POSTS);

  const posts = data?.posts || initialPosts;

  return (
    <div>
      <h1>Blog Posts</h1>

      <Form />

      <Stack spacing={2} direction="row">
        {posts.map(({ id, ...post }) => (
          <Card key={id}>
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
              <Link href={{ pathname: "/posts/[id]", query: { id } }}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </div>
  );
}

export const getStaticProps: GetStaticProps<IGetPostsQuery> = async () => {
  try {
    const client = getClient();
    const { data } = await client.query<IGetPostsQuery>({
      query: GET_POSTS,
    });

    return {
      props: {
        posts: data.posts,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
};
