import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Rating, Collapse } from '@mui/material';
import LessonCard from './LessonCard';

const CourseCard = ({ id, title, description, imageUrl, price, rating, instructor, instructorImage, lessons = [] }) => {
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = () => {
    setEnrolled(true);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" component="div">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Typography variant="h6" component="div" color="text.primary">Price: {price}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Rating:</Typography>
          <Rating value={rating} readOnly size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary">Instructor: {instructor}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <img src={instructorImage} alt="Instructor" style={{ width: 50, height: 50, borderRadius: '50%' }} />
        </Box>
      </CardContent>
      <CardActions>
        {!enrolled ? (
          <Button size="small" color="primary" onClick={handleEnroll}>Enroll</Button>
        ) : (
          <Collapse in={enrolled}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Lessons:</Typography>
              {lessons.map(lesson => (
                <LessonCard key={lesson.id} {...lesson} />
              ))}
            </Box>
          </Collapse>
        )}
      </CardActions>
    </Card>
  );
};

export default CourseCard;
