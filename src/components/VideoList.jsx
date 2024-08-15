import PropTypes from 'prop-types';
import { Box, Typography, Container, Grid, Button } from '@mui/material';

const VideoPlayer = ({ videoUrl, title, notes }) => {
  return (
    <Box 
      sx={{ 
        width: 300, 
        p: 2, 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        boxShadow: 3,
        backgroundColor: '#f9f9f9'
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        href={videoUrl} 
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch Video
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {notes}
      </Typography>
    </Box>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
};

const VideoGallery = () => {
  const videos = [
    { 
      videoUrl: 'https://www.youtube.com/watch?v=your-video-id1', 
      title: 'Introduction to Enrollment', 
      notes: 'Note: This video provides an overview of the enrollment process, including key steps and required documentation.' 
    },
    { 
      videoUrl: 'https://www.youtube.com/watch?v=your-video-id2', 
      title: 'Step-by-Step Guide', 
      notes: 'Note: A detailed guide on how to complete the enrollment form, what information is needed, and how to submit it successfully.' 
    },
    { 
      videoUrl: 'https://www.youtube.com/watch?v=your-video-id3', 
      title: 'Enrollment FAQs', 
      notes: 'Note: Frequently asked questions about enrollment, addressing common concerns and providing solutions.' 
    },
    { 
      videoUrl: 'https://www.youtube.com/watch?v=your-video-id4', 
      title: 'After Enrollment', 
      notes: 'Note: Information on what to expect after enrollment, including timelines, next steps, and available resources.' 
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Enrollment Video Gallery
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {videos.map((video, index) => (
          <Grid item key={index}>
            <VideoPlayer videoUrl={video.videoUrl} title={video.title} notes={video.notes} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VideoGallery;
