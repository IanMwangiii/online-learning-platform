import React from 'react'
import PropTypes from 'prop-types'
function LessonCard({title,description,onClick}) {
  return (
    <div className='lesson-card'>
        <div className='lesson-title'>{title}</div>
        <div className='lesson-description'>{description}</div>
        <button className='lesson-button' onClick={onClick}>View Lesson</button>
    </div>
  );
};
LessonCard.propTypes={
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onclick: PropTypes.func.isRequired,
}
export default LessonCard