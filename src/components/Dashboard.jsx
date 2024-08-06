
import React from 'react';
import CourseCard from './CourseCard';
import { Box, Typography, Grid } from '@mui/material';

const courses = [
  { id: 1, title: 'React Basics', description: 'Learn the basics of React.', imageUrl: 'https://assets.entrepreneur.com/content/3x2/2000/20141031174145-15-free-online-learning-sites.jpeg', price: '₹01234.50', rating: 4, instructor: 'John Doe' },
  { id: 2, title: 'JavaScript Fundamentals', description: 'Understand JavaScript fundamentals.', imageUrl: 'https://assets.entrepreneur.com/content/3x2/2000/20141031174145-15-free-online-learning-sites.jpeg', price: '$5678.90', rating: 5, instructor: 'Jane Smith',instructorImage: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png' },
];

const Dashboard = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={4}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <CourseCard
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              price={course.price}
              rating={course.rating}
              instructor={course.instructor}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
