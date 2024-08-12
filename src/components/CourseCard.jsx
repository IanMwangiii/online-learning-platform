import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Collapse, Rating } from '@mui/material';
import LessonCard from './LessonCard';
import EnrollButton from './EnrollButton';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({title, description, imageUrl, price, rating, instructor, instructorImage, lessons = [], isEnrolled }) => {
  const [enrolled, setEnrolled] = useState(isEnrolled);
  const navigate = useNavigate();

  const handleEnroll = () => {
    setEnrolled(true);
    navigate('/payment');
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">{description}</Typography>
        <Typography variant="h6" color="textPrimary">Price: {price}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="body2" color="textSecondary">Rating:</Typography>
          <Rating value={rating} readOnly size="small" sx={{ ml: 1 }} />
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>Instructor: {instructor}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <img src={instructorImage} alt="Instructor" style={{ width: 50, height: 50, borderRadius: '50%' }} />
        </Box>
      </CardContent>
      <CardActions>
        <EnrollButton isEnrolled={enrolled} onEnroll={handleEnroll} />
        <Collapse in={enrolled}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6">Lessons:</Typography>
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} {...lesson} />
            ))}
          </Box>
        </Collapse>
      </CardActions>
    </Card>
  );
};

CourseCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired, // Assuming price is a string like '$100'
  rating: PropTypes.number.isRequired,
  instructor: PropTypes.string.isRequired,
  instructorImage: PropTypes.string.isRequired,
  lessons: PropTypes.arrayOf(PropTypes.object), // Assuming lessons is an array of objects
  isEnrolled: PropTypes.bool.isRequired,
};

export default CourseCard;
