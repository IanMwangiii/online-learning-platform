import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EnrollButton = ({ isEnrolled, onEnroll }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isEnrolled) {
      onEnroll();  // Call the onEnroll callback
      navigate('/payment');
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isEnrolled}
      onClick={handleClick}
    >
      {isEnrolled ? 'Enrolled' : 'Enroll'}
    </Button>
  );
};

// PropTypes validation for EnrollButton
EnrollButton.propTypes = {
  isEnrolled: PropTypes.bool.isRequired,
  onEnroll: PropTypes.func.isRequired,
};

export default EnrollButton;
