import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    navigate(`/payment/${course.id}`);
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${course.price}
        </Typography>
        {course.rating && (
          <Typography variant="body2" color="text.secondary">
            Rating: {course.rating} / 5
          </Typography>
        )}
      </CardContent>
      <Button size="small" onClick={handleEnrollClick}>Enroll</Button>
    </Card>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number
  }).isRequired
};

export default CourseCard;
