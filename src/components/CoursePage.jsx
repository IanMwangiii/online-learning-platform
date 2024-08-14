import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';


const CoursePage = ({ enrolledCourses = [], onEnroll }) => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll(course.id);
    }
    // You can also add a notification or redirect logic here.
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {course && (
        <div>
          <Typography variant="h3">{course.title}</Typography>
          <Typography variant="body1">{course.description}</Typography>
          <Typography variant="body1">Instructor: {course.instructor}</Typography>
          {enrolledCourses.includes(course.id) ? (
            <Typography variant="body1">You are enrolled in this course.</Typography>
          ) : (
            <Button variant="contained" color="primary" onClick={handleEnroll}>
              Enroll Now
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

// Define PropTypes for the component
CoursePage.propTypes = {
  enrolledCourses: PropTypes.arrayOf(PropTypes.number).isRequired,
  onEnroll: PropTypes.func.isRequired,
};

export default CoursePage;
