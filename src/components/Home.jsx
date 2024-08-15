import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
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
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/courses'); // Redirect to the courses page
  };

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url("https://i.pinimg.com/564x/08/a6/e8/08a6e82373f618ecb1d43f175b129a2e.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: 3,
          animation: `${fadeIn} 2s ease-in-out`,
          position: 'relative',
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Welcome to Our Learning Platform
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Discover the best courses to enhance your skills
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ padding: '10px 20px', fontSize: '1.2rem', borderRadius: '50px' }}
          onClick={handleGetStartedClick}
        >
          Get Started
        </Button>
      </Box>

      {/* Platform Benefits Section */}
      <Box sx={{ padding: 6, backgroundColor: '#f0f0f0' }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 6,
            color: '#333',
            animation: `${fadeIn} 1.5s ease-in-out`,
          }}
        >
          Why Choose Our Platform?
        </Typography>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              animation: `${slideUp} 1.5s ease-in-out`,
            }}
          >
            <Card
              sx={{
                height: '250px',
                boxShadow: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                },
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  Expert Instructors
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Learn from industry experts with years of experience in their respective fields.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              animation: `${slideUp} 1.5s ease-in-out`,
            }}
          >
            <Card
              sx={{
                height: '250px',
                boxShadow: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                },
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  Flexible Learning
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Access courses anytime, anywhere, on any device. Learn at your own pace.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              animation: `${slideUp} 1.5s ease-in-out`,
            }}
          >
            <Card
              sx={{
                height: '250px',
                boxShadow: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                },
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  Community Support
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Join a vibrant community of learners and get support from peers and mentors.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ padding: 6, backgroundColor: '#ffffff' }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 6,
            color: '#333',
            animation: `${fadeIn} 1.5s ease-in-out`,
          }}
        >
          What Our Students Say
        </Typography>
        <Grid container spacing={4}>
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
              <Card
                sx={{
                  boxShadow: 4,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h3" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                    Student {testimonial}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
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
