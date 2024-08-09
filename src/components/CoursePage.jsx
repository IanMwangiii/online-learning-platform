import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import DiscussionThread from './DiscussionThread';
import ProgressTracker from './ProgressTracker';

const dummyDiscussions = [
  { user: 'Alice', comment: 'Great course!', date: '2024-08-01 10:30 AM' },
  { user: 'Bob', comment: 'I found the lessons very useful.', date: '2024-08-02 1:45 PM' },
];

const dummyCompletedLessons = [
  { id: 1, title: 'Introduction to React' }, // Example completed lesson
];

const CoursePage = () => {
  const { id } = useParams();

  // Example course data
  const course = {
    title: `Course ${id}`,
    description: 'This is a detailed description of the course.',
    lessons: [
      { id: 1, title: 'Introduction to React', description: 'Introduction to the course', videoUrl: 'https://www.youtube.com/watch?v=cjWqQkct6EI' },
      { id: 2, title: 'Advanced Topics', description: 'Advanced Topics', videoUrl: 'https://www.youtube.com/watch?v=cjWqQkct6EI' },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>{course.title}</Typography>
      <Typography variant="body1" gutterBottom>{course.description}</Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Lessons</Typography>
        {course.lessons.map((lesson) => (
          <Box key={lesson.id} sx={{ mb: 2 }}>
            <Typography variant="h6">{lesson.title}</Typography>
            <Typography variant="body2" color="text.secondary">{lesson.description}</Typography>
            <VideoPlayer videoUrl={lesson.videoUrl} />
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Progress Tracker</Typography>
        <ProgressTracker
          lessons={course.lessons}
          completedLessons={dummyCompletedLessons}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom></Typography>
        <DiscussionThread discussions={dummyDiscussions} />
      </Box>
    </Box>
  );
};

export default CoursePage;
