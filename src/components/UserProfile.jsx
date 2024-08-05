import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    role: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      const endpoint = 'http://127.0.0.1:5000/user-profile';
      const token = localStorage.getItem('access_token');
      
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            username: data.username,
            email: data.email,
            phone: data.phone,
            role: data.role
          });
        } else {
          setErrorMessage('Failed to fetch user data.');
        }
      } catch (error) {
        setErrorMessage('Error: ' + error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const endpoint = 'http://127.0.0.1:5000/update-profile';
    const token = localStorage.getItem('access_token');
    
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSuccessMessage('Profile updated successfully!');
      } else {
        setErrorMessage('Failed to update profile.');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div>
      <Box sx={{ padding: 4, width: '100%', maxWidth: '600px', margin: 'auto', bgcolor: 'background.paper', borderRadius: '8px' }}>
        <Typography variant="h5" gutterBottom>User Profile</Typography>
        <TextField 
          label="Username" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          name="username" 
          value={userData.username} 
          onChange={handleInputChange} 
        />
        <TextField 
          label="Email" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          name="email" 
          value={userData.email} 
          onChange={handleInputChange} 
        />
        <TextField 
          label="Phone" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          name="phone" 
          value={userData.phone} 
          onChange={handleInputChange} 
        />
        <TextField 
          label="Role" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          name="role" 
          value={userData.role} 
          onChange={handleInputChange} 
          disabled
        />
        <Button onClick={handleSave} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Save Changes
        </Button>
        <Snackbar
          open={!!successMessage || !!errorMessage}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={successMessage || errorMessage}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          ContentProps={{
            style: {
              backgroundColor: successMessage ? '#4CAF50' : '#D32F2F',
              color: 'white'
            },
          }}
        />
      </Box>
    </div>
  );
}

export default UserProfile;
