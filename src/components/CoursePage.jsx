import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LessonCard from './LessonCard';
import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false); // Ensure this state is correctly managed

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5555/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5555/api/courses/${courseId}/lessons`);
        const data = response.data;
        if (Array.isArray(data)) {
          setLessons(data);
        } else {
          console.error('Expected an array of lessons:', data);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    if (isEnrolled) fetchLessons();
  }, [courseId, isEnrolled]);

  const handleEnroll = () => {
    // You might want to set `isEnrolled` to true after successful payment
    setIsEnrolled(true);
  };

  return (
    <Box padding={3}>
      {course ? (
        <>
          <Typography variant="h4">{course.title}</Typography>
          <Typography variant="body1">{course.description}</Typography>
          {!isEnrolled ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEnroll}
            >
              Enroll Now
            </Button>
          ) : (
            <Box marginTop={3}>
              <Typography variant="h6">Lessons</Typography>
              {lessons.length > 0 ? (
                lessons.map(lesson => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))
              ) : (
                <Typography variant="body1">No lessons available.</Typography>
              )}
            </Box>
          )}
        </>
      ) : (
        <Typography variant="body1">Loading course information...</Typography>
      )}
    </Box>
  );
};

export default CoursePage;
