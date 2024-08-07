// components/VideoPlayer.jsx
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const VideoPlayer = ({ videoUrl, title }) => {
  return (
    <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
      <iframe
        src={videoUrl}
        title={title}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {!videoUrl && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <IconButton size="large" color="primary">
            <PlayArrowIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="h6">Video Unavailable</Typography>
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayer;
