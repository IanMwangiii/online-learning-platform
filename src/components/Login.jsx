import { useState } from 'react';
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
    const endpoint = 'http://127.0.0.1:5555/auth/login'; // Adjusted to match Flask route
    const body = JSON.stringify({
      username: formData.email, // Ensure this matches the field expected by the backend
      password: formData.password,
    });

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
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3, color: '#555' }}>
            Please log in to your account
          </Typography>
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
              sx={{ borderRadius: '8px' }}
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
              sx={{ borderRadius: '8px' }}
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
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 2, color: '#555' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#007BFF', textDecoration: 'none', fontWeight: 'bold' }}>Sign Up</Link>
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