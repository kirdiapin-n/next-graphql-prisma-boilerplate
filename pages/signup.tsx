import { CREATE_USER } from "@/graphql/mutations/users";
import { ICreateUserMutation, ICreateUserMutationVariables } from "@/graphql/types";
import { useMutation } from "@apollo/client";
import { Button, Stack, TextField } from "@mui/material";
import React, { type FormEvent, useState } from "react";

export default function CreateUserForm() {
  const [mutate] = useMutation<ICreateUserMutation, ICreateUserMutationVariables>(CREATE_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await mutate({ variables: { email, password, name } });
  };

  return (
    <div>
      <h1>Create User</h1>
      <Stack spacing={2} component="form" alignItems="flex-start" onSubmit={handleSubmit}>
        <TextField type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <TextField type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <Button type="submit">Create User</Button>
      </Stack>
    </div>
  );
}
