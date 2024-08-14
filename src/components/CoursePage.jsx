import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Button, Card, CardContent, Box, CircularProgress } from '@mui/material';
import Notification from './Notification';

const CoursePage = ({ enrolledCourses, onEnroll }) => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const response = await axios.post(`/api/courses/${id}/enroll`);
      onEnroll(response.data); // Assuming `onEnroll` is a function that updates the enrolled courses list
      setCourse({ ...course, enrolled: true });
    } catch (err) {
      setError('Failed to enroll in the course.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Notification message={error} severity="error" />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {course && (
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {course.description}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Instructor: {course.instructor}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Duration: {course.duration} hours
            </Typography>
            {enrolledCourses.includes(course.id) ? (
              <Typography variant="body1" color="primary" sx={{ marginTop: 2 }}>
                You are enrolled in this course.
              </Typography>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEnroll}
                sx={{ marginTop: 2 }}
              >
                Enroll Now
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Placeholder for additional course details */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Course Progress
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Track your progress and participate in discussions.
        </Typography>
        {/* Add progress tracking and discussion threads components here */}
      </Box>
    </Box>
  );
};

export default CoursePage;
