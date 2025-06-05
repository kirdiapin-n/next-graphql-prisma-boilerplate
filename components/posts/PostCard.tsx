"use client";

import DeleteButton from "@/app/posts/[id]/DeleteButton";
import { IGetPostQuery } from "@/graphql/types";
import { Card, CardContent, Typography } from "@mui/material";

export const PostCard = ({ post }: IGetPostQuery) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {new Date(Number(post.createdAt)).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">{post.content}</Typography>
      </CardContent>
      <DeleteButton postId={post.id} />
    </Card>
  );
};
