import React from 'react';

function ProgressTracker({ completed, total }) {
  const percentage = (completed / total) * 100;

  return (
    <div className="progress-tracker">
      <h4>Course Progress</h4>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      <p>{completed} of {total} lessons completed</p>
    </div>
  );
}

export default ProgressTracker;
