import { List } from "@/components/posts/List";
import { GET_POSTS } from "@/graphql/queries/posts";
import { IGetPostsQuery } from "@/graphql/types";
import { getClient } from "@/lib/ssrApolloClient";
import { IconButton, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

function Home({ posts }: IGetPostsQuery) {
  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>Blog Posts</h1>

        <IconButton href="/posts/add" LinkComponent={Link} title="Add Post">
          <AddIcon />
        </IconButton>
      </Stack>

      <List posts={posts} />
    </div>
  );
}

export default function HomePage(props: IGetPostsQuery) {
  return <Home {...props} />;
}

export const getServerSideProps: GetServerSideProps<IGetPostsQuery> = async () => {
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
