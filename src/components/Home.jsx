import React from 'react';
import Footer from './Footer';
import { Box, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: 'url(https://i.pinimg.com/originals/50/d8/6a/50d86a1153b0bb54156ccb62d8f6ff71.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          bgcolor: 'rgba(0, 0, 0, 0.5)', // Adding a semi-transparent overlay to improve text readability
          py: 5,
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
            Welcome to Our Learning Platform
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: '#ddd', mb: 4 }}>
            Login or sign up to start your learning journey.
          </Typography>
        </Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: '10px 20px',
                borderRadius: '25px',
                textTransform: 'none',
                backgroundColor: '#007BFF',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
            >
              Login
            </Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                padding: '10px 20px',
                borderRadius: '25px',
                textTransform: 'none',
                color: '#fff',
                borderColor: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: '#fff',
                },
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
