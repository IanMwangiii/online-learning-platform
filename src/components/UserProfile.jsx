import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, Snackbar, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      const id = localStorage.getItem('id');

      if (!token || !id) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5555/users/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          const errorResult = await response.json();
          setMessage(errorResult.error || 'Failed to fetch user data.');
        }
      } catch (error) {
        setMessage('Error: ' + error.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    navigate('/login');
  };

  const handleSnackbarClose = () => setMessage('');

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Grid item xs={12} sm={8}>
        <Box sx={{ padding: 4, width: '100%', bgcolor: 'background.paper', borderRadius: '8px', textAlign: 'center' }}>
          <IconButton onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">User Profile</Typography>
          {userData ? (
            <div>
              <Typography variant="h6">Username: {userData.username}</Typography>
              <Typography variant="h6">Name: {userData.name}</Typography>
              <Typography variant="h6">Email: {userData.email}</Typography>
              <Typography variant="h6">Phone: {userData.phone}</Typography>
              <Button onClick={handleLogout} variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                Log Out
              </Button>
            </div>
          ) : (
            <Typography variant="h6">Loading...</Typography>
          )}
        </Box>
      </Grid>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{
          style: {
            backgroundColor: '#D32F2F',
            color: 'white'
          },
        }}
      />
    </Grid>
  );
};

export default UserProfile;
