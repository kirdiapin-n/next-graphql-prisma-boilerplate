"use client";

import { useUser } from "@/context/UserContext";
import { SearchParamsNameEnum, useSearchParamsState } from "@/hooks/useSearchParamsState";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Stack, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";

export const SearchField = () => {
  const { user } = useUser();

  const [search, setSearch] = useSearchParamsState(SearchParamsNameEnum.search, "");

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <TextField
        label="Search Posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
  );
};
