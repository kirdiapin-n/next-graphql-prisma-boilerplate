import { List } from "@/components/posts/List";
import { GET_POSTS } from "@/graphql/queries/posts";
import { IGetPostsQuery } from "@/graphql/types";
import { getClient } from "@/lib/ssrApolloClient";
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
    <>
      <h1>Blog Posts</h1>

      <List posts={data.posts} />
    </>
  );
}
