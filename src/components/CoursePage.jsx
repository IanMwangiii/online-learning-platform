import React from 'react';
import { Box, Typography } from '@mui/material';

// VideoPlayer component
const VideoPlayer = ({ videoUrl, title }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
        <iframe
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        ></iframe>
      </Box>
    </Box>
  );
};

// VideoList component
const VideoList = () => {
  const videoData = [
    { title: 'Introduction to Programming', url: 'https://youtu.be/zOjov-2OZ0E?si=h7f3QXK3QvEOx9l3' },
    { title: 'Using GitHub', url: 'https://youtu.be/RGOj5yH7evk?si=0At9RSHBE9sQX1Bn' },
    { title: 'HTML & CSS Full Lesson', url: 'https://youtu.be/G3e-cpL7ofc?si=s2UGVvVuAOpRFsmi' },
    { title: 'Introduction to React', url: 'https://youtu.be/SqcY0GlETPk?si=L98xIdzgRk_K6sjo' },
    { title: 'More About React', url: 'https://youtu.be/DLX62G4lc44?si=Rw5rJBC89Pt6MvQU' },
    { title: 'Python Introduction', url: 'https://youtu.be/XKHEtdqhLK8?si=cXmc5dmwlFgf5shm' },
    { title: 'Full Python Video', url: 'https://youtu.be/nLRL_NcnK-4?si=z1lCkH3ZHmvMcqmb' },
    { title: 'JavaScript Introduction Video', url: 'https://youtu.be/lkIFF4maKMU?si=65dUnBaAStUKfrB' },
  ];

  return (
    <Box>
      {videoData.map((video, index) => (
        <VideoPlayer key={index} videoUrl={video.url} title={video.title} />
      ))}
    </Box>
  );
};

export default VideoList;