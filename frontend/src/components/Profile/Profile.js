import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from './listItems';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from 'react-router-dom';

export default function Profile () {

  const navigate = useNavigate();
  
  const navToFollower = () => {
    navigate('/followers');
  }
  const navToFollowing = () => {
    navigate('/following');
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CssBaseline />

        {/* add an*/}

        <Box
          sx={{
            // flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Container sx={{ mt: 4, mb: 4, width: '500px' }} >
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Button variant="contained" sx={{
                  bgcolor: 'brown', "&:hover": { bgcolor: 'orangered' }
                }} onClick={navToFollower}>
                  Followers 5
                </Button>

              </Grid>
              <Grid item md={6}>
                <Button variant="contained" sx={{
                  bgcolor: 'brown', "&:hover": { bgcolor: 'orangered' }
                }} onClick={navToFollowing}>
                  Following 5
                </Button>
              </Grid>

            </Grid>

          </Container>
          <Container sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography sx={{ p: 2 }}> Username </Typography>
              </Grid>
              <Grid item md={6}>
                <Paper sx={{ p: 2 }}> admin </Paper>
              </Grid>

              <Grid item md={6}>
                <Typography sx={{ p: 2 }}> Email </Typography>
              </Grid>
              <Grid item md={6}>
                <Paper sx={{ p: 2 }}> admin@admin.com </Paper>
              </Grid>

              <Grid item md={6}>
                <Typography sx={{ p: 2 }}> First Name </Typography>
              </Grid>
              <Grid item md={6}>
                <Paper sx={{ p: 2 }}> admin </Paper>
              </Grid>

              <Grid item md={6}>
                <Typography sx={{ p: 2 }}> Last Name </Typography>
              </Grid>
              <Grid item md={6}>
                <Paper sx={{ p: 2 }}> admin </Paper>
              </Grid>

              <Grid item md={6}>
                <Typography sx={{ p: 2 }}> Age </Typography>
              </Grid>
              <Grid item md={6}>
                <Paper sx={{ p: 2 }}> 20 </Paper>
              </Grid>

              <Grid item md={6}>
                <Typography sx={{ p: 2 }}> Contact Number </Typography>
              </Grid>
              <Grid item md={6}>
                <Paper sx={{ p: 2 }}> 9696969696 </Paper>
              </Grid>



            </Grid>
          </Container>
          <Container sx={{ mt: 4, mb: 4 }}>
            <Button variant="contained" endIcon={<EditIcon />} sx={{
              bgcolor: 'brown', "&:hover": { bgcolor: 'orangered' }
            }}>
              Edit
            </Button>
            {/* <Button variant="outlined" startIcon={<CancelIcon />} sx={{
              color: 'brown',
              border: '2px solid brown',
              fontStyle: 'bold',
              "&:hover": {
                color: 'orangered',
                border: '2px solid currentcolor',
              }
            }}>
              Cancel
            </Button>
            <Button variant="contained" endIcon={<SaveIcon />} sx={{
              bgcolor: 'brown', "&:hover": { bgcolor: 'orangered' }
            }}>
              Save
            </Button> */}

          </Container>
        </Box>
      </Box>
    </>
  );
}