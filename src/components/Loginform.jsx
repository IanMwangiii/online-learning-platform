import { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField, Button, IconButton, InputAdornment, Snackbar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const LogInForm = ({ logInWithEmail, logInWithPhone}) => {
  const [formData, setFormData] = useState({ email: '', phone: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = 'http://localhost:5555/auth/login';
    const body = JSON.stringify({
      ...(logInWithEmail && { email: formData.email }),
      ...(logInWithPhone && { phone: formData.phone }),
      password: formData.password,
    });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        setSuccessMessage('Login successful!');
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 3000);
      } else {
        const errorResult = await response.json();
        setErrorMessage(errorResult.message || 'Login failed. Please check your details.');
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
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        {logInWithEmail ? 'Log in with Email' : 'Log in with Phone'}
      </Typography>
      <form onSubmit={handleSubmit}>
        {logInWithEmail && (
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        )}
        {logInWithPhone && (
          <TextField
            label="Phone"
            type="tel"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        )}
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
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
          Log In
        </Button>
      </form>
      <Typography variant="body2" style={{ marginTop: '1rem', textAlign: 'center' }}>
        Do not have an account? <Link to="/signup" style={{ color: '#007BFF' }}>Sign Up</Link>
      </Typography>
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
    </div>
  );
};

// Define PropTypes for the LogInForm component
LogInForm.propTypes = {
  logInWithEmail: PropTypes.bool.isRequired,
  logInWithPhone: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default LogInForm;
