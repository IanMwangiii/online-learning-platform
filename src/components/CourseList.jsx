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

        const response = await axios.get('http://127.0.0.1:5555/courses', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page,
            per_page: 3 // Adjust the number of courses per page as needed
          }
        });

        console.log('API Response:', response.data);

        if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setError('Unexpected API response format.');
          console.error('Unexpected API response format:', response.data);
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
    <Box sx={{ position: 'relative', minHeight: '200px' }}>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 10
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && <Notification message={error} severity="error" />}

      {!loading && !error && courses.length === 0 && (
        <Typography variant="body1" align="center">
          No courses available. Please check back later or adjust your filters.
        </Typography>
      )}

      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            enrolledCourses={enrolledCourses}
            onEnroll={onEnroll}
          />
        ))}
      </Box>

      {!loading && totalPages > 1 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default CourseList;