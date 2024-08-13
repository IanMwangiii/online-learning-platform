import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Notification from './Notification';

const CourseList = ({ enrolledCourses, onEnroll }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found.');
          setLoading(false);
          return;
        }
  
        const response = await axios.get(`http://127.0.0.1:5555/courses`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        console.log('API Response:', response.data);
  
        if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setError('Unexpected API response format.');
        }
      } catch (err) {
        console.error('API Error:', err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data.message : 'Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, [page]);
  
  return (
    <div>
      {loading && <CircularProgress />}
      {error && <Notification message={error} severity="error" />}
      <div>
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              enrolledCourses={enrolledCourses}
              onEnroll={onEnroll}
            />
          ))
        ) : (
          <Typography variant="body1">No courses available.</Typography>
        )}
      </div>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Box>
    </div>
  );
};

export default CourseList;
