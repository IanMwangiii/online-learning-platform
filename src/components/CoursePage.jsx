import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import DiscussionThread from './DiscussionThread';
import RatingStars from './RatingStars'; // Make sure this component exists in your project
import ProgressTracker from './ProgressTracker';

const dummyDiscussions = [
  { user: 'Alice', comment: 'Great course!', date: '2024-08-01 10:30 AM' },
  { user: 'Bob', comment: 'I found the lessons very useful.', date: '2024-08-02 1:45 PM' },
];

const CoursePage = ({ enrolledCourses }) => {
  const { id } = useParams();
  const courseId = parseInt(id);

  // Check if the user is enrolled in the course
  if (!enrolledCourses.includes(courseId)) {
    // Redirect to payment page if not enrolled
    return <Navigate to="/payment" />;
  }

  // Example course data
  const course = {
    title: `Course ${courseId}`,
    description: 'This is a detailed description of the course.',
    lessons: [
      { id: 1, title: 'Introduction to React', description: 'Introduction to the course', videoUrl: 'https://www.youtube.com/embed/cjWqQkct6EI' },
      { id: 2, title: 'Advanced Topics', description: 'Advanced Topics', videoUrl: 'https://www.youtube.com/embed/cjWqQkct6EI' },
    ],
  };

  // State for managing completed lessons
  const [completedLessons, setCompletedLessons] = useState([]);

  const markLessonAsDone = (lessonId) => {
    const lesson = course.lessons.find(lesson => lesson.id === lessonId);
    if (lesson && !completedLessons.find(l => l.id === lessonId)) {
      setCompletedLessons([...completedLessons, lesson]);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>{course.title}</Typography>
      <Typography variant="body1" gutterBottom>{course.description}</Typography>

      {/* RatingStars Component */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Rate this course:</Typography>
        <RatingStars />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Lessons</Typography>
        {course.lessons.map((lesson) => (
          <Box key={lesson.id} sx={{ mb: 2 }}>
            <Typography variant="h6">{lesson.title}</Typography>
            <Typography variant="body2" color="text.secondary">{lesson.description}</Typography>
            <VideoPlayer videoUrl={lesson.videoUrl} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => markLessonAsDone(lesson.id)}
              disabled={!!completedLessons.find(l => l.id === lesson.id)}
              sx={{ mt: 2 }}
            >
              {completedLessons.find(l => l.id === lesson.id) ? 'Completed' : 'Mark as Done'}
            </Button>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Progress Tracker</Typography>
        <ProgressTracker
          lessons={course.lessons}
          completedLessons={completedLessons}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Discussion Thread</Typography>
        <DiscussionThread discussions={dummyDiscussions} />
      </Box>
    </Box>
  );
};

export default CoursePage;
