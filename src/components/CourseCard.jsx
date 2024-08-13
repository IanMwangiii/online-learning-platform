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
        <Typography variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Price: ${course.price}
        </Typography>
        <Rating value={course.rating || 0} readOnly />
        <Typography variant="body2" color="text.secondary">
          Instructor: {course.instructor}
        </Typography>
        <Button
          component={Link}
          to={`/course/${course.id}`}
          variant="contained"
          color="primary"
        >
          View Details
        </Button>
        {!isEnrolled && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onEnroll(course.id)}
          >
            Enroll
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCard;

