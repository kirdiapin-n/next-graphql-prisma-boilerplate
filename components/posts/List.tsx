"use client";

import { MIN_LENGTH_TO_SEARCH } from "@/constants/ui";
import { useUser } from "@/context/UserContext";
import { SEARCH_POSTS } from "@/graphql/queries/posts";
import { IGetPostsQuery, ISearchPostsQuery, ISearchPostsQueryVariables } from "@/graphql/types";
import { useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import { Button, Card, CardActions, CardContent, IconButton, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

export const List = ({ posts: initialPosts }: IGetPostsQuery) => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  const skip = searchTerm?.length <= MIN_LENGTH_TO_SEARCH;

  const { data: searchData } = useQuery<ISearchPostsQuery, ISearchPostsQueryVariables>(SEARCH_POSTS, {
    variables: { term: searchTerm },
    skip,
  });

  const posts = !skip ? searchData?.searchPosts || [] : initialPosts;

  return (
    <React.Fragment>
      <Stack sx={{ mb: 4 }} spacing={2} direction="row" alignItems="center">
        <TextField
          label="Search Posts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="Search by title or content..."
        />
        {user && (
          <IconButton href="/posts/add" LinkComponent={Link} title="Add Post">
            <AddIcon />
          </IconButton>
        )}
      </Stack>

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
    </React.Fragment>
  );
};
