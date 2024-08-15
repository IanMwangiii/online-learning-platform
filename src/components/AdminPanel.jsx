import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Button, TextField, MenuItem, Select } from '@mui/material';

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [newLesson, setNewLesson] = useState({ topic: '', content: '', video_url: '', course_id: '' });

  // Fetch courses and lessons
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5555/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddCourse = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5555/api/courses', { name: newCourseName });
      setCourses([...courses, response.data]);
      setNewCourseName('');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/api/courses/${courseId}`);
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleAddLesson = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5555/api/lessons', newLesson);
      const updatedCourses = courses.map(course => {
        if (course.id === newLesson.course_id) {
          course.lessons.push(response.data);
        }
        return course;
      });
      setCourses(updatedCourses);
      setNewLesson({ topic: '', content: '', video_url: '', course_id: '' });
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };

  const handleDeleteLesson = async (lessonId, courseId) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/api/lessons/${lessonId}`);
      const updatedCourses = courses.map(course => {
        if (course.id === courseId) {
          course.lessons = course.lessons.filter(lesson => lesson.id !== lessonId);
        }
        return course;
      });
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Courses
        </Typography>
        <Box>
          {courses.map(course => (
            <Box key={course.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 3 }}>
              <Typography variant="h6">{course.name}</Typography>
              <Button 
                variant="contained" 
                color="error" 
                sx={{ mt: 1 }} 
                onClick={() => handleDeleteCourse(course.id)}
              >
                Delete Course
              </Button>
              <Box sx={{ mt: 2 }}>
                {course.lessons && course.lessons.map(lesson => (
                  <Box key={lesson.id} sx={{ mt: 1, p: 2, border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                    <Typography>{lesson.topic}</Typography>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      sx={{ mt: 1 }} 
                      onClick={() => handleDeleteLesson(lesson.id, course.id)}
                    >
                      Delete Lesson
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add Course
        </Typography>
        <TextField
          label="Course Name"
          variant="outlined"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddCourse}
        >
          Add Course
        </Button>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Add Lesson
        </Typography>
        <TextField
          label="Lesson Topic"
          variant="outlined"
          value={newLesson.topic}
          onChange={(e) => setNewLesson({ ...newLesson, topic: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Lesson Content"
          variant="outlined"
          multiline
          rows={4}
          value={newLesson.content}
          onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Video URL"
          variant="outlined"
          value={newLesson.video_url}
          onChange={(e) => setNewLesson({ ...newLesson, video_url: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Select
          value={newLesson.course_id}
          onChange={(e) => setNewLesson({ ...newLesson, course_id: e.target.value })}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="">
            <em>Select Course</em>
          </MenuItem>
          {courses.map(course => (
            <MenuItem key={course.id} value={course.id}>
              {course.name}
            </MenuItem>
          ))}
        </Select>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddLesson}
        >
          Add Lesson
        </Button>
      </Box>
    </Container>
  );
};

export default AdminPanel;
