import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, IconButton, Box, Snackbar, InputAdornment } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';


const LogInOptions = ({ handleOpen }) => {
  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>Access Your Account</Typography>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <div
            onClick={() => handleOpen('phone')}
            style={{
              display: "flex",
              alignItems: 'center',
              padding: "15px",
              width: '300px',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              borderRadius: '8px',
              cursor: "pointer",
              backgroundColor: '#f9f9f9',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <FaPhoneAlt size={30} color="#007BFF" />
            <Typography style={{ color: '#333', marginLeft: '10px', fontWeight: '500' }}>Log In with Phone</Typography>
          </div>
        </Grid>
        <Grid item>
          <div
            onClick={() => handleOpen('email')}
            style={{
              display: "flex",
              alignItems: 'center',
              padding: "15px",
              width: '300px',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              borderRadius: '8px',
              cursor: "pointer",
              backgroundColor: '#f9f9f9',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <MdEmail size={30} color="#007BFF" />
            <Typography style={{ color: '#333', marginLeft: '10px', fontWeight: '500' }}>Log In with Email</Typography>
          </div>
        </Grid>
        <Grid item>
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <Typography style={{ textAlign: 'center', marginTop: '20px', cursor: 'pointer', color: '#007BFF', fontWeight: 'bold' }}>
              Don't have an account? Sign up
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

const LogInForm = ({ logInWithEmail, logInWithPhone, handleClose }) => {
  const [formData, setFormData] = useState({ email: '', phone: '', password: '' });

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

    <div>
      <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>
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
            InputProps={{
              style: {
                borderRadius: '8px',
              },
            }}
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
            InputProps={{
              style: {
                borderRadius: '8px',
              },
            }}
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
            style: {
              borderRadius: '8px',
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{
            marginTop: '1rem',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '8px',
            transition: 'background-color 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
        >
          Log In
        </Button>
      </form>
      <Typography variant="body2" style={{ marginTop: '1rem', textAlign: 'center', color: '#333' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#007BFF', fontWeight: 'bold' }}>Sign Up</Link>
      </Typography>

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

          style: {
            backgroundColor: successMessage ? '#4CAF50' : '#D32F2F',
            color: 'white',
            fontWeight: 'bold',
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
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f1f1f1' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            padding: 4,
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <IconButton onClick={() => navigate(-1)} style={{ marginBottom: '1rem', color: '#007BFF' }}>
            <ArrowBackIcon />
          </IconButton>
          <LogInOptions handleOpen={handleOpen} />
          <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogContent>
              <LogInForm logInWithEmail={logInWithEmail} logInWithPhone={logInWithPhone} handleClose={handleClose} />
            </DialogContent>
          </Dialog>
        </Box>
      </Grid>

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
