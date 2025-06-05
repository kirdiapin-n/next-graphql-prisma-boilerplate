import { PostCard } from "@/components/posts/PostCard";
import { GET_POST_BY_ID } from "@/graphql/queries/posts";
import { IGetPostQuery, IGetPostQueryVariables } from "@/graphql/types";
import { getClient } from "@/lib/ssrApolloClient";
import { notFound } from "next/navigation";
import { cache } from "react";

const loadPostById = cache(async (id: number) => {
  const client = getClient();

  const { data } = await client.query<IGetPostQuery, IGetPostQueryVariables>({
    query: GET_POST_BY_ID,
    variables: { id },
  });

  return data?.post || null;
});

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PostPageProps) {
  const { id } = await params;
  const post = await loadPostById(Number(id));
  if (!post) return { title: "Post not found | MyApp" };

  return {
    title: `${post.title} | MyApp`,
    description: post.content.slice(0, 160),
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await loadPostById(Number(id));
  if (!post) return notFound();

  return <PostCard post={post} />;
}
