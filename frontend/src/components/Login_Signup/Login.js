import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/api';
import axios from 'axios';

const theme = createTheme();

export default function Login () {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const allFieldsHaveValue = Object.values(formData).every(Boolean);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("formData", formData);
      const response = await api.post("/api/auth/login", formData);

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("isAuthenticated", "true");
      axios.defaults.headers.common['x-auth-token'] = response.data.token;
      api.defaults.headers.common['x-auth-token'] = response.data.token;
      // console.log("authToken", response.data.token);
      
      const redirect = location.state?.from.pathname || '/';
      navigate(redirect);
    } catch (err) {
      console.error(err);
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
              id="userName"
              label="Username"
              name="userName"
              autoComplete="userName"
              autoFocus
              value={formData.userName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              type="password"
              value={formData.password}
              onChange={handleChange}
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
