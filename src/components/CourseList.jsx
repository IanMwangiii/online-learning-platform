import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import { Grid, CircularProgress, Typography, Button } from '@mui/material';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5555/api/courses');  // Ensure this URL matches your Flask API route
      console.log('API response:', response);  // Debug line to check API response
      setCourses(response.data);  // Update to handle the response as an array
      setLoading(false);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchCourses();
  };

  if (loading) return <CircularProgress />;
  if (error) return (
    <div>
      <Typography variant="h6" color="error">{error}</Typography>
      <Button variant="contained" color="primary" onClick={handleRetry}>Retry</Button>
    </div>
  );

  return (
    <Grid container spacing={2}>
      {courses.length > 0 ? (
        courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))
      ) : (
        <Typography variant="h6">No courses available</Typography>
      )}
    </Grid>
  );
};

export default CourseList;