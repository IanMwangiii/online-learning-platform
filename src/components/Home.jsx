import React from 'react';
import Footer from './Footer';
import SearchBar from './SearchBar';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { keyframes } from '@mui/system';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

function Home({ onSearch }) {
  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url("/path/to/hero-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: 3,
          animation: `${fadeIn} 2s ease-in-out`,
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Welcome to Our Learning Platform
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Discover the best courses to enhance your skills
        </Typography>
        <SearchBar onSearch={onSearch} />
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 3,
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            animation: `${slideUp} 2s ease-in-out`,
            '&:hover': {
              backgroundColor: '#1565c0',
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease-in-out',
            },
          }}
        >
          Browse Courses
        </Button>
      </Box>

      {/* Featured Courses Section */}
      <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 4,
            animation: `${fadeIn} 1.5s ease-in-out`,
          }}
        >
          Featured Courses
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((course) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={course}
              sx={{
                animation: `${slideUp} 1.5s ease-in-out`,
              }}
            >
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
                    Course Title {course}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    Course description goes here. It should be concise and informative.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease-in-out',
                      },
                    }}
                  >
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ padding: 4, backgroundColor: '#fff' }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 4,
            animation: `${fadeIn} 1.5s ease-in-out`,
          }}
        >
          What Our Students Say
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3].map((testimonial) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={testimonial}
              sx={{
                animation: `${slideUp} 1.5s ease-in-out`,
              }}
            >
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" component="h3" sx={{ marginBottom: 1 }}>
                    Student Name {testimonial}
                  </Typography>
                  <Typography variant="body2">
                    "This platform has transformed the way I learn. The courses are comprehensive and
                    the instructors are top-notch."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
