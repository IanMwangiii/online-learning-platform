import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Button, Card, CardContent } from '@mui/material';
import Notification from './Notification';

const CoursePage = ({ enrolledCourses }) => {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <Notification message={error} severity="error" />;

  return (
    <div>
      {course && (
        <div>
          <Typography variant="h3">{course.title}</Typography>
          <Typography variant="body1">{course.description}</Typography>
          <Typography variant="body1">Instructor: {course.instructor}</Typography>
          {enrolledCourses.includes(course.id) ? (
            <Typography variant="body1">You are enrolled in this course.</Typography>
          ) : (
            <Button variant="contained" color="primary">
              Enroll Now
            </Button>
          )}
          {/* Add progress tracking and discussion threads here */}
        </div>
      )}
    </div>
  );
};

export default CoursePage;