import * as React from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Greddiit_Logo from '../../images/Greddiit_Logo_1.jpg';

export default function Topbar () {
  return (
    <AppBar position="absolute">
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
          bgcolor: 'orangered',
        }}
      >
        <img src={Greddiit_Logo} alt="Greddiit Logo" height={35} width={35} />
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Greddiit
        </Typography>
      </Toolbar>
    </AppBar>
  );
}