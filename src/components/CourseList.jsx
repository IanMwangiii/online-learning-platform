import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import { Box, Typography, CircularProgress, Button, Pagination, Alert } from '@mui/material';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/courses?page=${page}`);
      setCourses(response.data.courses || []);
      setTotalPages(response.data.totalPages || 1);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch courses');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : courses.length === 0 ? (
        <Typography>No courses available</Typography>
      ) : (
        <Box>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              price={course.price}
              rating={course.rating}
              instructor={course.instructor}
              instructorImage={course.instructorImage}
              lessons={course.lessons}
              isEnrolled={course.isEnrolled}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CourseList;
