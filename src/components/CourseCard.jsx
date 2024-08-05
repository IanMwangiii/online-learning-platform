import React from 'react';

function CourseCard({ title, description }) {
  return (
    <div className="course-card">
      <h2 className="course-title">{title}</h2>
      <p className="course-description">{description}</p>
      <button className="enroll-button">Enroll</button>
    </div>
  );
}

export default CourseCard;
