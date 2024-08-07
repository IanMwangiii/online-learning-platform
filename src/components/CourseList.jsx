// CourseList.jsx
import React from 'react';
import CourseCard from './CourseCard';
import { Box } from '@mui/material';

const courses = [
  {
    title: 'Course Name 1',
    imageUrl: 'https://assets.entrepreneur.com/content/3x2/2000/20141031174145-15-free-online-learning-sites.jpeg',
    rating: 4,
    price: '₹01234.50',
    instructorImage: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png',
    instructorName: 'Full Name',
  },
  {
    title: 'Course Name 2',
    imageUrl: 'https://assets.entrepreneur.com/content/3x2/2000/20141031174145-15-free-online-learning-sites.jpeg',
    rating: 3,
    price: '$01234.50',
    instructorImage: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png',
    instructorName: 'Full Name',
  },
];

const CourseList = () => {
  return (
    <Box className="row-card-course" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </Box>
  );
};

export default CourseList;
