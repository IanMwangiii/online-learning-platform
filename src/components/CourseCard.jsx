import React from 'react';
import PropTypes from 'prop-types';
function CourseCard({ title, description, onEnroll }) {
  return (
    <div className="course-card">
      <div className="course-title">
        {title}
      </div>
      <div className="course-description">
        {description}
      </div>
      <button className="course-button" onClick={onEnroll}>
        Enroll
      </button>
    </div>
  );
}

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onEnroll: PropTypes.func.isRequired
};

export default CourseCard;
