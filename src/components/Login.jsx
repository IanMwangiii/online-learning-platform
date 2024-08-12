import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, IconButton, Box, Snackbar, InputAdornment } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
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
        navigate('/user-profile', { replace: true });
      } else {
        const errorResult = await response.json();
        setMessage({ text: errorResult.message || 'Login failed. Please check your credentials.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error: ' + error.message, type: 'error' });
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleSnackbarClose = () => setMessage({ text: '', type: '' });

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Grid item xs={12} sm={6}>
        <Box sx={{ padding: 4, width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ marginBottom: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant='outlined'
              fullWidth
              margin='normal'
              name='username'
              value={formData.username}
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

export default Login;
