import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Box, Snackbar } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', phone: '', role: 'user' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = 'http://localhost:5555/auth/signup';  // Adjusted to match Flask route
    const body = JSON.stringify(formData);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });

      if (response.ok) {
        navigate('/login', { replace: true });
      } else {
        const errorResult = await response.json();
        setMessage(errorResult.message || 'Signup failed. Please check your details.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleSnackbarClose = () => setMessage('');

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Grid item xs={12} sm={6}>
        <Box sx={{ padding: 4, width: '100%', bgcolor: 'background.paper', borderRadius: '8px' }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>Sign Up</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Role"
              variant="outlined"
              fullWidth
              margin="normal"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center' }}>
            Already have an account? <Link to="/login" style={{ color: '#007BFF' }}>Login</Link>
          </Typography>
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

export default SignUp;
