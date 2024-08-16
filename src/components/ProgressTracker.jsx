// ProgressTracker.js
import React from 'react';
import { Box, Typography, LinearProgress, Paper } from '@mui/material';

const ProgressTracker = ({ currentLesson, totalLessons }) => {
  const progress = totalLessons > 0 ? (currentLesson / totalLessons) * 100 : 0;

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        Progress
      </Typography>
      <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {`Lesson ${currentLesson} of ${totalLessons}`}
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ width: '100%' }} />
      </Paper>
    </Box>
  );
};

export default ProgressTracker;
