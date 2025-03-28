import { CREATE_POST } from "@/graphql/mutations/posts";
import { GET_POSTS } from "@/graphql/queries/posts";
import { ICreatePostMutation, IGetPostsQuery } from "@/graphql/types";
import { useMutation } from "@apollo/client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Form() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [createPost, { loading, error }] = useMutation<ICreatePostMutation>(CREATE_POST, {
    update(cache, { data }) {
      const existingPosts = cache.readQuery<IGetPostsQuery>({ query: GET_POSTS })?.posts || [];

      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: data?.createPost ? [...existingPosts, data.createPost] : existingPosts },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      await createPost({ variables: { title, content } });
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Create a New Post
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? "Submitting..." : "Create Post"}
      </Button>
      {error && <Typography color="error">{error.message}</Typography>}
    </Box>
  );
}
