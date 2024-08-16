import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LessonCard from './LessonCard';
import { Grid, CircularProgress, Typography, Button } from '@mui/material';

const LessonList = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchLessons(courseId);
    } else {
      setError('Course ID is missing.');
      setLoading(false);
    }
  }, [courseId]);

  const fetchLessons = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5555/api/courses/${id}/lessons`);
      if (Array.isArray(response.data)) {
        setLessons(response.data);
      } else {
        setError('Unexpected response format.');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load lessons. Please try again.');
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchLessons(courseId);
  };

  if (loading) return <CircularProgress />;
  if (error) return (
    <div>
      <Typography variant="h6" color="error">{error}</Typography>
      <Button onClick={handleRetry}>Retry</Button>
    </div>
  );

  return (
    <Grid container spacing={2}>
      {lessons.map(lesson => (
        <Grid item xs={12} sm={6} md={4} key={lesson.id}>
          <LessonCard lesson={lesson} />
        </Grid>
      ))}
    </Grid>
  );
};

export default LessonList;
