import { List } from "@/components/posts/List";
import { SearchField } from "@/components/posts/SearchField";
import { GET_POSTS } from "@/graphql/queries/posts";
import { IGetPostsQuery } from "@/graphql/types";
import { getClient } from "@/lib/ssrApolloClient";
import { Stack } from "@mui/material";
import React from "react";

export const metadata = {
  title: "Home | MyApp",
  description: "Home page with posts",
};

export default async function HomePage() {
  const client = getClient();
  const { data } = await client.query<IGetPostsQuery>({
    query: GET_POSTS,
  });

  return (
    <Stack spacing={4}>
      <h1>Blog Posts</h1>

      <SearchField />

      <List posts={data.posts} />
    </Stack>
  );
}
