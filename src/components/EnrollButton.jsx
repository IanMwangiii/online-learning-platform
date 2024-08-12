import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EnrollButton = ({ isEnrolled, onEnroll }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isEnrolled}
      onClick={() => {
        if (!isEnrolled) {
          navigate('/payment');
        }
      }}
    >
      {isEnrolled ? 'Enrolled' : 'Enroll'}
    </Button>
  );
};

export default EnrollButton;