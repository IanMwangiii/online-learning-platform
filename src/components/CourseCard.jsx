import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    navigate(`/payment/${course.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345, // Card width
        margin: 'auto', // Center the card horizontally
        boxShadow: 3, // Add shadow
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)', // Slight lift on hover
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
          {course.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: 2,
          }}
        >
          {course.description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: 1,
            fontWeight: 'medium',
          }}
        >
          Price: ${course.price}
        </Typography>
        {course.rating && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginBottom: 2,
            }}
          >
            Rating: {course.rating} / 5
          </Typography>
        )}
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'center', // Center the button
          paddingBottom: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleEnrollClick}
          sx={{
            textTransform: 'none', // Prevent all caps in the button text
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: '#1976d2', // Initial color (Material-UI default primary color)
            transition: 'background-color 0.3s ease-in-out', // Smooth transition
            '&:hover': {
              backgroundColor: 'green', // Color change on hover
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
  }).isRequired,
};

export default CourseCard;