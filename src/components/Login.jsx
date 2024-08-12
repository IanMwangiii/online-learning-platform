import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, IconButton, Box, Snackbar, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = 'http://localhost:5555/auth/login';
    const body = JSON.stringify(formData);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('id', data.id);
        navigate('/userprofile', { replace: true });
      } else {
        const errorResult = await response.json();
        setMessage(errorResult.message || 'Login failed. Please check your details.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleSnackbarClose = () => setMessage('');

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Grid item xs={12} sm={6}>
        <Box sx={{ padding: 4, width: '100%', bgcolor: 'background.paper', borderRadius: '8px' }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>Login</Typography>
          <form onSubmit={handleSubmit}>
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
              type={passwordVisible ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
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
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#007BFF' }}>Sign Up</Link>
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

export default Login;
