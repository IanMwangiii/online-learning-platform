import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const CourseCard = ({ course, enrolledCourses, onEnroll }) => {
  const isEnrolled = enrolledCourses.includes(course.id);

  return (
    <Card>
      <CardMedia
        component="img"
        alt={course.title}
        height="140"
        image={course.image_url || '/default-image.png'}
      />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">{description}</Typography>
        <Typography variant="h6" color="textPrimary">Price: {price}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="body2" color="textSecondary">Rating:</Typography>
          <Rating value={rating} readOnly size="small" sx={{ ml: 1 }} />
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>Instructor: {instructor}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <img src={instructorImage} alt="Instructor" style={{ width: 50, height: 50, borderRadius: '50%' }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
