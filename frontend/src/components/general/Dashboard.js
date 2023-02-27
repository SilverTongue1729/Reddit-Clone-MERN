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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import RedditIcon from '@mui/icons-material/Reddit';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// import Profile from './Profile';
import Greddiit_Logo from '../../images/Greddiit_Logo_1.jpg';
import Profile from '../Profile/Profile';
import PrivateRoute from './PrivateRoute';
import Reddit from '@mui/icons-material/Reddit';

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
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    delete axios.defaults.headers.common['x-auth-token'];
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
                  <MenuIcon />
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
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />

              <List component="nav">
                {/* {mainListItems} */}
                {/* <ListItemButton onClick={NavigateToProfile}> */}
                <ListItemButton onClick={() => navigate('/profile')}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/mysubgreddiits')}>
                  <ListItemIcon>
                    <FolderSharedIcon />
                  </ListItemIcon>
                  <ListItemText primary="My SubGreddiits" />
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/subgreddiits')}>
                  <ListItemIcon>
                    <RedditIcon />
                  </ListItemIcon>
                  <ListItemText primary="SubGreddiits" />
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/savedposts')}>
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Saved Posts" />
                </ListItemButton>

                {isSubGreddiit &&
                  <ListItemButton onClick={() => (null)}>
                    <ListItemIcon>
                      <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItemButton>
                  &&
                  <ListItemButton onClick={() => (null)}>
                    <ListItemIcon>
                      <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Joining Requests" />
                  </ListItemButton>
                  &&
                  <ListItemButton onClick={() => (null)}>
                    <ListItemIcon>
                      <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Stats" />
                  </ListItemButton>
                  &&
                  <ListItemButton onClick={() => (null)}>
                    <ListItemIcon>
                      <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reported" />
                  </ListItemButton>

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