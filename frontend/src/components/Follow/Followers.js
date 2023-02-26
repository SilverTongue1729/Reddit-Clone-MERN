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

export default function Following () {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          sx={{
            // flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            p: 1,
            // '& > :not(style)': {
            //   m: 1,
            //   height: 128,
            //   width: 128,
            // },
          }}>
            {/* <Paper elevation={15} sx={{
              p: 1,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              bgcolor: 'lightsalmon',
              color: 'white',
            }}>
              <Typography sx={{ textAlign: 'center', fontSize:'20px' }} variant="body2" component="p"> Following</Typography>
            </Paper>
             */}
            <Paper elevation={10} sx={{
              p: 1,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              bgcolor: 'brown',
              color: 'white',
              fontSize: '20px',
              height: '50px',
              width: '250px',
            }}>Followers 5</Paper>

          </Box>

          <Container sx={{ mt: 2, mb: 2, width: '250px', textAlign: "center" }}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Paper sx={{ p: 2 }}> follower1 </Paper>
              </Grid>

              <Grid item md={12}>
                <Paper sx={{ p: 2 }}> follower2 </Paper>
              </Grid>

              <Grid item md={12}>
                <Paper sx={{ p: 2 }}> follower3 </Paper>
              </Grid>

              <Grid item md={12}>
                <Paper sx={{ p: 2 }}> follower4 </Paper>
              </Grid>

              <Grid item md={12}>
                <Paper sx={{ p: 2 }}> follower5 </Paper>
              </Grid>

            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}