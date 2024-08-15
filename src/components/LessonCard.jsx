import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const LessonCard = ({ lesson }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{lesson.title}</Typography>
        <Typography variant="body2">{lesson.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
