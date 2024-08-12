import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EnrollButton = ({ isEnrolled, onEnroll }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color={isEnrolled ? "success" : "primary"}
      disabled={isEnrolled}
      onClick={() => {
        if (!isEnrolled) {
          navigate('/payment');
        }
      }}
      sx={{
        padding: '10px 20px',
        fontWeight: 'bold',
        fontSize: '1rem',
        borderRadius: '8px',
        textTransform: 'none',
        backgroundColor: isEnrolled ? '#4CAF50' : '#007BFF',
        '&:hover': {
          backgroundColor: isEnrolled ? '#388E3C' : '#0056b3',
          transition: 'background-color 0.3s ease',
        },
        '&:disabled': {
          backgroundColor: '#9E9E9E',
          color: '#ffffff',
          cursor: 'not-allowed',
        }
      }}
    >
      {isEnrolled ? 'Enrolled' : 'Enroll'}
    </Button>
  );
};

export default EnrollButton;
