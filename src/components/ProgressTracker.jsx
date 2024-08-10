import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const ProgressTracker = ({ progress }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Course Progress
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2" color="textSecondary">
        {progress}% completed
      </Typography>
    </Box>
  );
};

export default ProgressTracker;
