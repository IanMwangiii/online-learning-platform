import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import DiscussionThread from './DiscussionThread';

const dummyDiscussions = [
  { user: 'Alice', comment: 'Great course!', date: '2024-08-01 10:30 AM' },
  { user: 'Bob', comment: 'I found the lessons very useful.', date: '2024-08-02 1:45 PM' },
];

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
      {/* Integrate DiscussionThread component */}
      <DiscussionThread discussions={dummyDiscussions} />
    </Box>
  );
};

export default CoursePage;
