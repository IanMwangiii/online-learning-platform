import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, IconButton, Box, Snackbar, InputAdornment } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const LogInOptions = ({ handleOpen }) => {
  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Get your account</Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <div
            onClick={() => handleOpen('phone')}
            style={{ display: "flex", alignItems: 'center', padding: "15px", width: '250px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', cursor: "pointer" }}
          >
            <FaPhoneAlt size={30} />
            <Typography style={{ color: '#032541', marginLeft: '10px' }}>Log In with Phone</Typography>
          </div>
        </Grid>
        <Grid item>
          <div
            onClick={() => handleOpen('email')}
            style={{ display: "flex", alignItems: 'center', padding: "15px", width: '250px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', cursor: "pointer" }}
          >
            <MdEmail size={30} />
            <Typography style={{ color: '#032541', marginLeft: '10px' }}>Log In with Email</Typography>
          </div>
        </Grid>
        <Grid item>
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <Typography style={{ textAlign: 'center', marginTop: '10px', cursor: 'pointer', color: '#007BFF', paddingRight: 200 }}>Don't have an account? Sign up</Typography>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

const LogInForm = ({ logInWithEmail, logInWithPhone, handleClose }) => {
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
    let endpoint;
    let body;

    if (logInWithEmail) {
      endpoint = 'http://localhost:5555/auth/login';
      body = JSON.stringify({ email: formData.email, password: formData.password });
    } else if (logInWithPhone) {
      endpoint = 'http://localhost:5555/auth/login';
      body = JSON.stringify({ phone: formData.phone, password: formData.password });
    }

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
      <Typography variant="h5" style={{ marginBottom: '20px' }}>{logInWithEmail ? 'Log in with Email' : 'Log in with Phone'}</Typography>
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
        Don't have an account? <Link to="/signup" style={{ color: '#007BFF' }}>Sign Up</Link>
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

const Login = () => {
  const [open, setOpen] = useState(false);
  const [logInWithEmail, setLogInWithEmail] = useState(true);
  const [logInWithPhone, setLogInWithPhone] = useState(false);
  const navigate = useNavigate();

  const handleOpen = (type) => {
    if (type === 'email') {
      setLogInWithEmail(true);
      setLogInWithPhone(false);
    } else if (type === 'phone') {
      setLogInWithEmail(false);
      setLogInWithPhone(true);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Grid item xs={12} sm={8} md={6} lg={4} style={{ marginTop: '-150px' }}>
        <Box sx={{ padding: 10, width: '100%', bgcolor: 'background.paper', borderRadius: '8px' }}>
          <IconButton onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
            <ArrowBackIcon />
          </IconButton>
          <LogInOptions handleOpen={handleOpen} />
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <LogInForm logInWithEmail={logInWithEmail} logInWithPhone={logInWithPhone} handleClose={handleClose} />
            </DialogContent>
          </Dialog>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
