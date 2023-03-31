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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { orangered } from '@mui/material/colors';

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/api';
import axios from 'axios';


const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  bgcolor: 'darkred',
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '20px',
  color: 'white'
}));

export default function Signup () {
  const navigate = useNavigate();
  // const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    age: "",
    contactNo: "",
    password: "",
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
      const response = await api.post("/api/auth/signup", formData);

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("isAuthenticated", "true");
      console.log("authToken", response.data.token);
      axios.defaults.headers.common['x-auth-token'] = response.data.token;
      api.defaults.headers.common['x-auth-token'] = response.data.token;

      // const redirect = location.state?.from.pathname || '/';
      // navigate(redirect);
      navigate("/");
      
    } catch (err) {
      console.error(err);
      console.log("err", err.message)
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
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              autoFocus
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="age"
              label="Age"
              type="number"
              id="age"
              autoComplete="age"
              value={formData.age}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contactNo"
              label="Mobile No."
              type="tel"
              id="contactNo"
              autoComplete="tel"
              value={formData.contactNo}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="username"
              autoFocus
              value={formData.userName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: 'white', bgcolor: 'orangered', '&:hover': { bgcolor: 'orangered' } }}
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
