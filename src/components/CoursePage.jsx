import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import DiscussionThread from './DiscussionThread';

const dummyDiscussions = [
  { user: 'Alice', comment: 'Great course!', date: '2024-08-01 10:30 AM' },
  { user: 'Bob', comment: 'I found the lessons very useful.', date: '2024-08-02 1:45 PM' },
];

const CoursePage = () => {
  const { id } = useParams();

  // Example course data
  const course = {
    title: `Course ${id}`,
    description: 'This is a detailed description of the course.',
    lessons: [
      { title: 'Lesson 1', description: 'Introduction to the course', videoUrl: 'https://example.com/video1' },
      { title: 'Lesson 2', description: 'Advanced Topics', videoUrl: 'https://example.com/video2' },
    ],
  };

  console.log('Course data:', course);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>{course.title}</Typography>
      <Typography variant="body1" gutterBottom>{course.description}</Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Lessons</Typography>
        {course.lessons.map((lesson, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="h6">{lesson.title}</Typography>
            <Typography variant="body2" color="text.secondary">{lesson.description}</Typography>
            <VideoPlayer videoUrl={lesson.videoUrl} />
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Discussion Thread</Typography>
        <DiscussionThread discussions={dummyDiscussions} />
      </Box>
    </Box>
  );
};

export default CoursePage;
