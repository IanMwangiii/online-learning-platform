import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, IconButton, Box, Snackbar, InputAdornment, MenuItem } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', phone: '', password: '', role: 'user' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = 'http://localhost:5555/auth/signup';
    const body = JSON.stringify(formData);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });

      if (response.ok) {
        setMessage({ text: 'User signed up successfully!', type: 'success' });
        navigate('/login', { replace: true });
      } else {
        const errorResult = await response.json();
        setMessage({ text: errorResult.message || 'Signup failed. Please check your details.', type: 'error' });
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
          <Typography variant="h4" sx={{ marginBottom: 2 }}>Sign Up</Typography>
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
            <TextField
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
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

export default SignUp;
