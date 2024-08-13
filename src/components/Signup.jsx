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
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }}>
      <Grid item xs={12} sm={8} md={4}>
        <Box
          sx={{
            padding: 4,
            bgcolor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#007BFF' }}>
            Create an Account
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3, color: '#555' }}>
            Join us to explore more!
          </Typography>
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
              sx={{ borderRadius: '8px' }}
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
              sx={{ borderRadius: '8px' }}
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
              sx={{ borderRadius: '8px' }}
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
              sx={{ borderRadius: '8px' }}
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
              sx={{ borderRadius: '8px' }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                padding: 1.5,
                backgroundColor: '#007BFF',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 2, color: '#555' }}>
            Already have an account? <Link to="/login" style={{ color: '#007BFF', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
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