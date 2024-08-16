import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  // Handle case where course might be undefined or have missing properties
  const {
    id = 0,
    name = 'No title available',  // Changed from title to name
    description = 'No description available',
    price = 0,
    rating = null,
  } = course || {};

  const handleEnrollClick = () => {
    navigate(`/payment/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 'auto',
        boxShadow: 3,
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          {name} {/* Changed from title to name */}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: 2,
          }}
        >
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: 1,
            fontWeight: 'medium',
          }}
        >
          Price: ${price}
        </Typography>
        {rating !== null && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginBottom: 2,
            }}
          >
            Rating: {rating} / 5
          </Typography>
        )}
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'center',
          paddingBottom: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleEnrollClick}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: '#1976d2',
            transition: 'background-color 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'green',
            },
          }}
        >
          Enroll
        </Button>
      </CardActions>
    </Card>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string, // Changed from title to name
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
  }).isRequired,
};

export default CourseCard;
