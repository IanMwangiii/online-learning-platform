import React from 'react'
function LessonCard({title,description,onClick}) {
  return (
    <div className='lesson-card'>
        <h1>card</h1>
        <div className='lesson-title'>{title}</div>
        <div className='lesson-description'>{description}</div>
        <button className='lesson-button' onClick={onClick}>View Lesson</button>
    </div>
  )
}

export default LessonCard