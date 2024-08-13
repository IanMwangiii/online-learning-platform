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
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Box sx={{ padding: 4, bgcolor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <IconButton onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
            <ArrowBackIcon style={{ color: '#007BFF' }} />
          </IconButton>
          <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#007BFF' }}>
            User Profile
          </Typography>
          {userData ? (
            <Box>
              <Typography variant="h6" sx={{ color: '#555', marginBottom: 1 }}>Username: <span style={{ fontWeight: 'bold' }}>{userData.username}</span></Typography>
              <Typography variant="h6" sx={{ color: '#555', marginBottom: 1 }}>Name: <span style={{ fontWeight: 'bold' }}>{userData.name}</span></Typography>
              <Typography variant="h6" sx={{ color: '#555', marginBottom: 1 }}>Email: <span style={{ fontWeight: 'bold' }}>{userData.email}</span></Typography>
              <Typography variant="h6" sx={{ color: '#555', marginBottom: 1 }}>Phone: <span style={{ fontWeight: 'bold' }}>{userData.phone}</span></Typography>
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  marginTop: 3,
                  padding: 1.5,
                  backgroundColor: '#D32F2F',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#B71C1C',
                  },
                }}
              >
                Log Out
              </Button>
            </Box>
          ) : (
            <Typography variant="h6" sx={{ color: '#555' }}>Loading...</Typography>
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
