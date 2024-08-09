import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import VideoPlayer from './VideoPlayer';

const LessonCard = ({ title, description, videoUrl }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <VideoPlayer videoUrl={videoUrl} title={title} />
      </CardContent>
    </Card>
  );
};

export default LessonCard;
