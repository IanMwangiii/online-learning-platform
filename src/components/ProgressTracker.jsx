import React from 'react';
import { Box, Typography, LinearProgress, List, ListItem, ListItemText } from '@mui/material';

const ProgressTracker = ({ lessons, completedLessons }) => {
  // Calculate progress
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const completionPercentage = (completedCount / totalLessons) * 100;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Course Progress</Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body1">
          {completedCount} of {totalLessons} lessons completed
        </Typography>
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{ marginTop: 1 }}
        />
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {completionPercentage.toFixed(2)}% completed
        </Typography>
      </Box>
      <Typography variant="h6" gutterBottom>Completed Lessons</Typography>
      <List>
        {completedLessons.map((lesson, index) => (
          <ListItem key={index}>
            <ListItemText primary={lesson.title} />
          </ListItem>
        ))}
        {completedLessons.length === 0 && (
          <ListItem>
            <ListItemText primary="No lessons completed yet." />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default ProgressTracker;