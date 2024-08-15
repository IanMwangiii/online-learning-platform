// import React, { useState } from 'react';
// import { Box, Button, Typography, Paper } from '@mui/material';
// // import Login from './Login';
// // import SignUp from './SignUp';

// const LandingPage = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//         padding: 2,
//       }}
//     >
//       <Paper 
//         elevation={6} 
//         sx={{
//           padding: { xs: 3, sm: 4 }, 
//           maxWidth: 500, 
//           width: '100%', 
//           backgroundColor: '#ffffff',
//           borderRadius: 3,
//         }}
//       >
//         {isLogin ? (
//           <>
//             <Typography variant="h4" textAlign="center" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
//               Welcome Back
//             </Typography>
//             <Login />
//             <Typography variant="body2" textAlign="center" sx={{ marginTop: 2 }}>
//               Don't have an account?{' '}
//               <Button onClick={toggleForm} sx={{ textTransform: 'none', color: '#007BFF' }}>
//                 Sign Up
//               </Button>
//             </Typography>
//           </>
//         ) : (
//           <>
//             <Typography variant="h4" textAlign="center" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
//               Create an Account
//             </Typography>
//             <SignUp />
//             <Typography variant="body2" textAlign="center" sx={{ marginTop: 2 }}>
//               Already have an account?{' '}
//               <Button onClick={toggleForm} sx={{ textTransform: 'none', color: '#007BFF' }}>
//                 Login
//               </Button>
//             </Typography>
//           </>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default LandingPage;
