import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, IconButton, InputAdornment, Snackbar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data from backend
    // Uncomment and replace with your API endpoint
    /*
    const fetchUserProfile = async () => {
      const endpoint = 'http://127.0.0.1:5000/user-profile';
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          setFormData({
            email: result.email,
            // Add other fields as needed
          });
        } else {
          const errorResult = await response.json();
          setErrorMessage(errorResult.error || 'Failed to fetch profile data.');
        }
      } catch (error) {
        setErrorMessage('Error: ' + error.message);
      }
    };

    fetchUserProfile();
    */
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = 'http://127.0.0.1:5000/user-profile'; // Update with your backend endpoint
    const body = JSON.stringify({ email: formData.email, password: formData.password });

    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: body,
      });

      if (response.ok) {
        setSuccessMessage('Profile updated successfully!');
        // Optionally, redirect or refresh the page
      } else {
        const errorResult = await response.json();
        setErrorMessage(errorResult.error || 'Profile update failed.');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSnackbarClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div>
      <Box sx={{ padding: 4, width: '100%', maxWidth: '400px', margin: 'auto', bgcolor: 'background.paper', borderRadius: '8px' }}>
        <Typography variant="h5" gutterBottom>User Profile</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
          />
          <TextField 
            label="Password" 
            type={passwordVisible ? "text" : "password"} 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            name="password" 
            value={formData.password} 
            onChange={handleInputChange} 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Update Profile
          </Button>
        </form>
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
