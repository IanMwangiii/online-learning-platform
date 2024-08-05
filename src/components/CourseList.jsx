import React from 'react';
import CourseCard from './CourseCard';

function CourseList({ courses }) {
  return (
    <div className="course-list">
      {courses.map(course => (
        <CourseCard key={course.id} title={course.title} description={course.description} />
      ))}
    </div>
  );
}

export default CourseList;
