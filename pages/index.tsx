import { List } from "@/components/posts/List";
import { GET_POSTS } from "@/graphql/queries/posts";
import { IGetPostsQuery } from "@/graphql/types";
import { getClient } from "@/lib/ssrApolloClient";
import { WithUser, withUser } from "@/lib/withUser";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Stack } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";

function Home({ posts, user }: WithUser<IGetPostsQuery>) {
  return (
    <>
      <Head>
        <title>Home | MyApp</title>
        <meta name="description" content="Home page with posts" />
      </Head>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>Blog Posts</h1>

        {user ? (
          <IconButton href="/posts/add" LinkComponent={Link} title="Add Post">
            <AddIcon />
          </IconButton>
        ) : (
          <div />
        )}
      </Stack>

      <List posts={posts} />
    </>
  );
}

export default function HomePage(props: WithUser<IGetPostsQuery>) {
  return <Home {...props} />;
}

export const getServerSideProps = withUser(async () => {
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
});
