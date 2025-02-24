'use client'

import { useState } from 'react';
import { Box, Paper, Avatar, Typography, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { KeyboardArrowDown, Settings, Person, Logout } from '@mui/icons-material';
import { NavbarProps } from './navbar.type';

const NavbarView = ({ userName, userImage }: NavbarProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        height: 65,
        bgcolor: 'background.paper',
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >

      <Paper
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '6px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
          width: '180px',
          height: '40px',
        }}
      >
        <Avatar
          src={userImage}
          alt={userName}
          sx={{
            width: 28,
            height: 28,
            borderRadius: '8px',
          }}
        />
        <Typography
          sx={{
            ml: 1.5,
            fontWeight: 500,
            fontSize: '0.875rem',
            fontFamily: 'Poppins',
          }}
        >
          {userName}
        </Typography>
        <Box sx={{ flexGrow: 1 }} /> {/* This pushes the arrow to the right */}
        <KeyboardArrowDown /> {/* Removed ml since we're using flexGrow */}
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            width: 200,
            boxShadow: theme.shadows[4]
          }
        }}
      >
        <MenuItem onClick={handleClose}>
          <Person sx={{ mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          <Logout sx={{ mr: 2 }} /> Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavbarView;
