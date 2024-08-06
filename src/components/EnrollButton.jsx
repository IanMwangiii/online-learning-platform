import React from 'react';

function EnrollButton({ isEnrolled, onEnroll }) {
  return (
    <button className="enroll-button" onClick={onEnroll}>
      {isEnrolled ? 'Already Enrolled' : 'Enroll'}
    </button>
  );
}

export default EnrollButton;
