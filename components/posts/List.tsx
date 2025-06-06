"use client";

import { MIN_LENGTH_TO_SEARCH } from "@/constants/ui";
import { SEARCH_POSTS } from "@/graphql/queries/posts";
import { IGetPostsQuery, ISearchPostsQuery, ISearchPostsQueryVariables } from "@/graphql/types";
import { SearchParamsNameEnum, useSearchParamsState } from "@/hooks/useSearchParamsState";
import { useQuery } from "@apollo/client";
import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export const List = ({ posts: initialPosts }: IGetPostsQuery) => {
  const [searchTerm] = useSearchParamsState(SearchParamsNameEnum.search);

  const skip = searchTerm?.length <= MIN_LENGTH_TO_SEARCH;

  const { data: searchData } = useQuery<ISearchPostsQuery, ISearchPostsQueryVariables>(SEARCH_POSTS, {
    variables: { term: searchTerm },
    skip,
  });

  const posts = !skip ? searchData?.searchPosts || [] : initialPosts;

  return (
    <Stack gap={2} direction="row" flexWrap="wrap">
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
            <Button LinkComponent={Link} href={`posts/${id}`} size="small">
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
};
