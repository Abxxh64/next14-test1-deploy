import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { logoutAction } from '../services/auth-actions';

export default function TopBar(props: {name: string}) {
  const router = useRouter();

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h5" component="h2" sx={{ flexGrow: 1, ml: 2 }}>
          {props.name}
        </Typography>
        

      </Toolbar>
    </AppBar>
  );
}


