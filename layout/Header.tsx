import { useUser } from "@auth0/nextjs-auth0";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left - Home */}
        <Box>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
        </Box>
        {JSON.stringify(user, null, 2)}

        {/* Right - User Dropdown */}
        <Box>
          {user ? (
            <>
              <IconButton size="large" color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <Link href="/profile" passHref legacyBehavior>
                    <a style={{ textDecoration: "none", color: "inherit" }}>Профиль</a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/auth/logout" passHref legacyBehavior>
                    <a style={{ textDecoration: "none", color: "inherit" }}>Выйти</a>
                  </Link>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link href="/auth/login" passHref legacyBehavior>
                <Button color="inherit">Войти</Button>
              </Link>
              <Link href="/register" passHref legacyBehavior>
                <Button color="inherit">Регистрация</Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
