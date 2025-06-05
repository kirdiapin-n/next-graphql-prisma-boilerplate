"use client";

import { Box, Typography } from "@mui/material";

export default function Error() {
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h4" color="error" gutterBottom>
        Mistake when loading the post
      </Typography>
      <Typography variant="body1">Please try later or return to the main one.</Typography>
    </Box>
  );
}
