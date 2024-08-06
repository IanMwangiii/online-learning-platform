import React from 'react';

function LessonCard({ title, description }) {
  return (
    <div className="lesson-card">
      <h3 className="lesson-title">{title}</h3>
      <p className="lesson-description">{description}</p>
    </div>
  );
}

export default LessonCard;
