import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CourseCard from './CourseCard';

const courses = [
  {
    id: 1,
    title: 'React Basics',
    description: 'Learn the basics of React.',
    imageUrl: 'https://assets.entrepreneur.com/content/3x2/2000/20141031174145-15-free-online-learning-sites.jpeg',
    price: '₹1234.50',
    rating: 4,
    instructor: 'John Doe',
    instructorImage: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png',
    lessons: [
      { id: 1, title: 'Introduction to React', description: 'An overview of React and its core concepts.', videoUrl: 'https://www.youtube.com/embed/abc123' },
      { id: 2, title: 'Components and Props', description: 'Learn about React components and props.', videoUrl: 'https://www.youtube.com/embed/abc123' },
      { id: 3, title: 'State Management', description: 'Understanding state management in React.', videoUrl: 'https://www.youtube.com/embed/abc123' },
    ],
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals',
    description: 'Understand JavaScript fundamentals.',
    imageUrl: 'https://assets.entrepreneur.com/content/3x2/2000/20141031174145-15-free-online-learning-sites.jpeg',
    price: '$5678.90',
    rating: 5,
    instructor: 'Jane Smith',
    instructorImage: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png',
    lessons: [
      { id: 1, title: 'JavaScript Basics', description: 'Introduction to JavaScript.', videoUrl: 'https://www.youtube.com/embed/abc123' },
      { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into JavaScript features.', videoUrl: 'https://www.youtube.com/embed/abc123' },
    ],
  },
];

const Courses = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Courses</Typography>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <CourseCard {...course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Courses;
