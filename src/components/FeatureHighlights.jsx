import React from 'react';
import { Box, Typography, Grid, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ForumIcon from '@mui/icons-material/Forum';
import './FeatureHighlights.css'; // Import the CSS file

const features = [
  {
    icon: <SchoolIcon fontSize="large" color="primary" />,
    title: 'Expert Instructors',
    description: 'Learn from industry experts who are passionate about teaching.',
    details: 'Our instructors have years of experience and a proven track record of success in their respective fields. They are dedicated to providing high-quality education and support to ensure you achieve your learning goals.'
  },
  {
    icon: <VideoLibraryIcon fontSize="large" color="primary" />,
    title: 'Extensive Library',
    description: 'Access a vast library of courses and resources at any time.',
    details: 'With thousands of courses available, you can explore various topics and skills at your own pace. Our library is constantly updated with new content to keep you engaged and informed.'
  },
  {
    icon: <ForumIcon fontSize="large" color="primary" />,
    title: 'Interactive Community',
    description: 'Engage with peers and instructors through discussions and forums.',
    details: 'Join discussions, ask questions, and share your insights with a vibrant community of learners and educators. Our forums provide a platform for collaborative learning and networking.'
  },
];

const FeatureHighlights = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedFeature, setSelectedFeature] = React.useState(null);

  const handleOpenDialog = (feature) => {
    setSelectedFeature(feature);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedFeature(null);
  };

  return (
    <Box className="feature-highlights-container">
      <Typography className="feature-title" variant="h4" gutterBottom>
        Why Choose Us?
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <Typography className="feature-title-text">
                {feature.title}
              </Typography>
              <Typography className="feature-description">
                {feature.description}
              </Typography>
              <Button 
                className="learn-more-button"
                variant="outlined" 
                onClick={() => handleOpenDialog(feature)}
              >
                Learn More
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {selectedFeature && (
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{selectedFeature.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{selectedFeature.details}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default FeatureHighlights;
