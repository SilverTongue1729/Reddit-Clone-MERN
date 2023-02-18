import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Topbar from '../general/Topbar';

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
