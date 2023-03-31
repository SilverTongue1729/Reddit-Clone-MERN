import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/api';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Grid, CssBaseline } from '@mui/material';
import { AppBar as MuiAppBar, Drawer as MuiDrawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Divider, } from '@mui/material';
import { Logout as LogoutIcon, Bookmark, ChevronLeft, FolderShared, Menu, People, Person, Reddit, PersonAdd, BarChart, Flag, } from '@mui/icons-material';

import Greddiit_Logo from '../../images/Greddiit_Logo_1.jpg';
import PrivateRoute from './PrivateRoute';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent () {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  const isSubGreddiit = location.pathname.startsWith('/subgreddiit/');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const Logout = () => {
    console.log('logout');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['x-auth-token'];
    delete api.defaults.headers.common['x-auth-token'];
    navigate('/loginsignup');
  }

  return (
    <PrivateRoute>
      <main>
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex', p: '10' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open} >
              <Toolbar
                sx={{
                  pr: '24px', // keep right padding when drawer closed
                  bgcolor: 'orangered',
                  // pd: '10px',
                  // bgColor: 'red',
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                  <Menu />
                </IconButton>
                <img src={Greddiit_Logo} alt="Greddiit Logo" height={35} width={35} />
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                > Greddiit
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeft />
                </IconButton>
              </Toolbar>
              <Divider />

              <List component="nav">
                {/* {mainListItems} */}
                {/* <ListItemButton onClick={NavigateToProfile}> */}
                <ListItemButton onClick={() => navigate('/profile')}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/mysubgreddiits')}>
                  <ListItemIcon>
                    <FolderShared />
                  </ListItemIcon>
                  <ListItemText primary="My SubGreddiits" />
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/subgreddiits')}>
                  <ListItemIcon>
                    <Reddit />
                  </ListItemIcon>
                  <ListItemText primary="SubGreddiits" />
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/savedposts')}>
                  <ListItemIcon>
                    <Bookmark />
                  </ListItemIcon>
                  <ListItemText primary="Saved Posts" />
                </ListItemButton>

                {isSubGreddiit &&
                  <>
                    <Divider />
                    <ListItemButton onClick={() => (null)}>
                      <ListItemIcon>
                        <People />
                      </ListItemIcon>
                      <ListItemText primary="Users" />
                    </ListItemButton>

                    <ListItemButton onClick={() => (null)}>
                      <ListItemIcon>
                        <PersonAdd />
                      </ListItemIcon>
                      <ListItemText primary="Joining Requests" />
                    </ListItemButton>

                    <ListItemButton onClick={() => (null)}>
                      <ListItemIcon>
                        <BarChart />
                      </ListItemIcon>
                      <ListItemText primary="Stats" />
                    </ListItemButton>

                    <ListItemButton onClick={() => (null)}>
                      <ListItemIcon>
                        <Flag />
                      </ListItemIcon>
                      <ListItemText primary="Reports" />
                    </ListItemButton>
                  </>
                }

                <ListItemButton onClick={Logout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItemButton>
                <Divider sx={{ my: 1 }} />
              </List>

            </Drawer>
            <Box
              component="main"
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container sx={{ mt: 6, mb: 4 }}>
                <Grid container spacing={3} >

                  <Outlet />

                </Grid>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </main>
    </PrivateRoute>
  );
}

export default function Dashboard () {
  return <DashboardContent />;
}