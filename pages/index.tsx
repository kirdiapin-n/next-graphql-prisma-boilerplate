import Form from "@/components/posts/Form";
import { GET_POSTS } from "@/graphql/queries/posts";
import client from "@/lib/apolloClient";
import { getClient } from "@/lib/ssrApolloClient";
import { Post } from "@/types/posts";
import { ApolloProvider, useQuery } from "@apollo/client";
import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useEffect } from "react";

interface HomeProps {
  posts: Post[];
}

function Home({ posts: initialPosts }: HomeProps) {
  useEffect(() => {
    client.writeQuery({
      query: GET_POSTS,
      data: { posts: initialPosts },
    });
  }, [initialPosts]);

  const { data } = useQuery<{ posts: Post[] }>(GET_POSTS);

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

export default function HomePage(props: HomeProps) {
  return (
    <ApolloProvider client={client}>
      <Home {...props} />
    </ApolloProvider>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const client = getClient();
    const { data } = await client.query<{ posts: Post[] }>({
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
