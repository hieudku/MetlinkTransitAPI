import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  useTheme, 
  useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { ListItemButton } from '@mui/material'

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const menuItems = [
    { label: 'Stops', path: '/' },
    { label: 'Map', path: '/map' },
    { label: 'About', path: '/about' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#003B4C' }}>
        <Toolbar>
          <img
            src="metlink.png"
            alt="Metlink Logo"
            style={{ height: 32, marginRight: 12 }}
          />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Metlink Tracker
          </Typography>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                <List>
                  {menuItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                    <ListItemButton component={Link} to={item.path} onClick={toggleDrawer}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            menuItems.map((item) => (
              <Button color="inherit" key={item.path} component={Link} to={item.path}>
                {item.label}
              </Button>
            ))
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
