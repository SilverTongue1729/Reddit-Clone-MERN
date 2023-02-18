import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import FilledInput from '@mui/material/FilledInput';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { orangered } from '@mui/material/colors';

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const theme = createTheme();

export default function Login () {
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = (field) => (event) => {
    setValues({
      ...values,
      [field]: event.target.value,
    });
  };

  const allFieldsHaveValue = Object.values(values).every(Boolean);

  const onLoginSuccess = () => {
    const redirect = location.state?.from.pathname || '/profile';
    navigate(redirect);
  }


  useEffect(() => {
    if (localStorage.getItem('isAuthenticated')) {
      onLoginSuccess();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('username') === 'admin' && data.get('password') === 'admin') {
      // console.log('Login Successful');
      localStorage.setItem('isAuthenticated', true);
      onLoginSuccess();
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={values.username}
              onChange={handleChange('username')}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={values.password}
              onChange={handleChange('password')}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: 'white', bgcolor: 'orangered', '&:hover': { bgcolor: 'orangered' } }}
              // color={allFieldsHaveValue ? 'primary' : 'default'}
              disabled={!allFieldsHaveValue}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
