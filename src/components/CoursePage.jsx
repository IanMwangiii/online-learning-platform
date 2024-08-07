import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const { id } = useParams();

  // Fetch course details based on the ID and display them here
  // Example:
  // const course = fetchCourseById(id);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Course Details</Typography>
      <Typography variant="h6">Course ID: {id}</Typography>
      {/* Display course content, lessons, and videos here */}
    </Box>
  );
};

export default CoursePage;
