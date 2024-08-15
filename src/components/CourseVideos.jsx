import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import VideoPlayer from './VideoPlayer'; // Adjust the path as needed

const CourseVideos = () => {
  const [videos, setVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleAddVideo = () => {
    if (videoUrl && title) {
      // Convert short YouTube URL to embed URL
      const embedUrl = videoUrl.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
      setVideos([...videos, { url: embedUrl, title }]);
      setVideoUrl('');
      setTitle('');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Course Videos</Typography>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddVideo}>
          Add Video
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {videos.map((video, index) => (
          <VideoPlayer key={index} videoUrl={video.url} title={video.title} />
        ))}
      </Box>
    </Box>
  );
};

export default CourseVideos;
