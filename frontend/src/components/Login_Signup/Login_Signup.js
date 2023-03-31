import * as React from 'react';
import { Box, Grid, Typography, Paper, AppBar, Toolbar } from '@mui/material/';
import { styled } from '@mui/material/styles';

import { useState } from 'react';

import Greddiit_Logo from '../../images/Greddiit_Logo_1.jpg';
import Login from './Login';
import Signup from './Signup';

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: 'coral',
  backgroundColor: 'lightsalmon',
  // backgroundColor: 'brown',
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '20px',
  color: 'white',
  // transition: 'all 0.3s ease-in-out',  
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: 'orangered',
  },
}));

function Topbar () {
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

export default function LoginSignup () {

  const [login, setLogin] = useState(true);

  if (login) {
    return (
      <React.Fragment>

        <Topbar />

        <Box sx={{ m: '7% 25% 5% 25%' }}>
          <Grid container spacing={2} sx={{ height: '20px' }}>
            <Grid item xs={6}>
              <Item sx={{ bgcolor: 'orangered' }}>Login</Item>
            </Grid>
            <Grid item xs={6}>
              <Item onClick={() => setLogin(false)}>Sign Up</Item>
            </Grid>
          </Grid>
        </Box>

        <Login />

      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>

        <Topbar />

        <Box sx={{ m: '7% 25% 5% 25%' }}>
          <Grid container spacing={2} sx={{ height: '20px' }}>
            <Grid item xs={6}>
              <Item onClick={() => setLogin(true)}>Login</Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ bgcolor: 'orangered' }}>Sign Up</Item>
            </Grid>
          </Grid>
        </Box>

        <Signup />

      </React.Fragment>
    );
  }
}
