import Form from "@/components/posts/Form";
import { List } from "@/components/posts/List";
import { GET_POSTS } from "@/graphql/queries/posts";
import { IGetPostsQuery } from "@/graphql/types";
import { getClient } from "@/lib/ssrApolloClient";
import { GetStaticProps } from "next";
import React from "react";

function Home({ posts }: IGetPostsQuery) {
  return (
    <div>
      <h1>Blog Posts</h1>

      <Form />

      <List posts={posts} />
    </div>
  );
}

export default function HomePage(props: IGetPostsQuery) {
  return <Home {...props} />;
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
