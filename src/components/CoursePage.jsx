import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import VideoPlayer from './VideoPlayer';
import DiscussionThread from './DiscussionThread';
import ProgressTracker from './ProgressTracker';

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    // Fetch course details
    axios.get(`http://127.0.0.1:5000/courses/${courseId}`)
      .then(response => setCourse(response.data))
      .catch(error => console.error('Error fetching course data:', error));
  }, [courseId]);

  const markLessonAsDone = (lessonId) => {
    // Update completed lessons state (assuming you have an API to update this)
    setCompletedLessons([...completedLessons, lessonId]);
  };

  return (
    <Box sx={{ p: 3 }}>
      {course && (
        <>
          <Typography variant="h4">{course.name}</Typography>
          <Typography variant="body1">{course.description}</Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Lessons</Typography>
            {course.lessons.map((lesson) => (
              <Box key={lesson.id} sx={{ mb: 2 }}>
                <Typography variant="h6">{lesson.topic}</Typography>
                <Button variant="contained" onClick={() => markLessonAsDone(lesson.id)}>Mark as Done</Button>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Video</Typography>
            <VideoPlayer videoUrl={course.video_url} />
          </Box>

          <Box sx={{ mt: 4 }}>
            <DiscussionThread courseId={courseId} />
          </Box>

          <Box sx={{ mt: 4 }}>
            <ProgressTracker completedLessons={completedLessons} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default CoursePage;
