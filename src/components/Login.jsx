// import React, { useState } from 'react';
// import { Box, TextField, Button, Typography, IconButton, InputAdornment, Snackbar } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const endpoint = 'http://127.0.0.1:5000/login';
//     const body = JSON.stringify({ email: formData.email, password: formData.password });

//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: body,
//       });

//       if (response.ok) {
//         const result = await response.json();
//         localStorage.setItem('access_token', result.token);
//         localStorage.setItem('role', result.role);
//         localStorage.setItem('id', result.id);
//         setSuccessMessage('User signed in successfully!');
//         setTimeout(() => {
//           navigate('/', { replace: true });
//         }, 3000);
//       } else {
//         const errorResult = await response.json();
//         setErrorMessage(errorResult.error || 'Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       setErrorMessage('Error: ' + error.message);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleSnackbarClose = () => {
//     setSuccessMessage('');
//     setErrorMessage('');
//   };

//   return (
//     <div>
//       <Box sx={{ padding: 4, width: '100%', maxWidth: '400px', margin: 'auto', bgcolor: 'background.paper', borderRadius: '8px' }}>
//         <Typography variant="h5" gutterBottom>Log In</Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField 
//             label="Email" 
//             variant="outlined" 
//             fullWidth 
//             margin="normal" 
//             name="email" 
//             value={formData.email} 
//             onChange={handleInputChange} 
//           />
//           <TextField 
//             label="Password" 
//             type={passwordVisible ? "text" : "password"} 
//             variant="outlined" 
//             fullWidth 
//             margin="normal" 
//             name="password" 
//             value={formData.password} 
//             onChange={handleInputChange} 
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={togglePasswordVisibility}>
//                     {passwordVisible ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//             Log In
//           </Button>
//         </form>
//         <Snackbar
//           open={!!successMessage || !!errorMessage}
//           autoHideDuration={6000}
//           onClose={handleSnackbarClose}
//           message={successMessage || errorMessage}
//           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//           ContentProps={{
//             style: {
//               backgroundColor: successMessage ? '#4CAF50' : '#D32F2F',
//               color: 'white'
//             },
//           }}
//         />
//       </Box>
//     </div>
//   );
// }

// export default Login;
