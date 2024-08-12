import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, Button, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('access_token');

      try {
        const response = await fetch(`http://localhost:5555/user/${id}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          const errorResult = await response.json();
          setMessage({ text: errorResult.message || 'Failed to fetch user data.', type: 'error' });
        }
      } catch (error) {
        setMessage({ text: 'Error: ' + error.message, type: 'error' });
      }
    };

    fetchUserData();
  }, []);

  const handleSnackbarClose = () => setMessage({ text: '', type: '' });

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Grid item xs={12} sm={6}>
        <Box sx={{ padding: 4, width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>User Profile</Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.username || ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.email || ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.phone || ''}
            InputProps={{ readOnly: true }}
          />
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => navigate('/edit-profile')}>
            Edit Profile
          </Button>
        </Box>
      </Grid>
      <Snackbar
        open={!!message.text}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message.text}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{
          sx: {
            backgroundColor: message.type === 'success' ? '#4CAF50' : '#D32F2F',
            color: 'white'
          },
        }}
      />
    </Grid>
  );
};

export default UserProfile;
