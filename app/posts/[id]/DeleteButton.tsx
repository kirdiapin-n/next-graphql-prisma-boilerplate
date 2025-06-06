"use client";

import { DELETE_POST } from "@/graphql/mutations/posts";
import { IDeletePostMutation, IDeletePostMutationVariables } from "@/graphql/types";
import { useMutation } from "@apollo/client";
import { Button, CardActions } from "@mui/material";
import { useRouter } from "next/navigation";

export default function DeleteButton({ postId }: { postId: number }) {
  const router = useRouter();
  const [mutate] = useMutation<IDeletePostMutation, IDeletePostMutationVariables>(DELETE_POST);

  const handleDelete = async () => {
    const { data } = await mutate({ variables: { id: postId } });

    if (data?.deletePost.success) {
      router.push("/");
    }
  };

  return (
    <CardActions>
      <Button color="error" onClick={handleDelete}>
        Delete
      </Button>
    </CardActions>
  );
}
