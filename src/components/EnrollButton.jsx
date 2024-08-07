import React from 'react';
import { Button } from '@mui/material';

const EnrollButton = ({ isEnrolled, onEnroll }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isEnrolled}
      onClick={onEnroll}
    >
      {isEnrolled ? 'Enrolled' : 'Enroll'}
    </Button>
  );
};

export default EnrollButton;
