import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FcBusinessman } from 'react-icons/fc';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import Notification from './Notification';

const NavList = styled('ul')({
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const NavItem = styled('li')(({ theme }) => ({
  marginRight: theme.spacing(4), // Increased margin for more spacing
  '&:hover': {
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const LoginLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    color: '#f50057',
    transition: 'color 0.3s ease-in-out',
  },
});

function Navbar() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationData, setNotificationData] = useState({ message: '', severity: 'info' });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by looking for the access token in local storage
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleMenuClick = () => {
    navigate('/dashboard');
  };

  const handleNotificationClick = () => {
    setNotificationData({
      message: 'New course added!',
      severity: 'info',
    });
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ height: '64px', backgroundColor: '#3f51b5', zIndex: 1300 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon sx={{ '&:hover': { color: '#f50057', transition: 'color 0.3s ease-in-out' } }} />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          LearnSphere
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavList>
              <NavItem>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/courses" style={{ textDecoration: 'none', color: 'inherit' }}>Courses</Link>
              </NavItem>
              <NavItem>
                <Link to="/FAQ" style={{ textDecoration: 'none', color: 'inherit' }}>FAQ</Link>
              </NavItem>
              <NavItem>
                <IconButton color="inherit" onClick={handleNotificationClick}>
                  <IoMdNotificationsOutline />
                </IconButton>
              </NavItem>
              {!isLoggedIn && ( // Conditionally render the Login button
                <NavItem>
                  <LoginLink to="/login" className="login-link">Login</LoginLink>
                </NavItem>
              )}
              <NavItem>
                <Link to="/user-profile">
                  <FcBusinessman />
                </Link>
              </NavItem>
            </NavList>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: '64px' }} />

      <Notification
        open={notificationOpen}
        message={notificationData.message}
        severity={notificationData.severity}
        onClose={handleNotificationClose}
      />
    </>
  );
}

export default Navbar;