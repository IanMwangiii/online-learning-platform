import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseById } from '../api';
import './App.css';

function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const courseData = await fetchCourseById(courseId);
      setCourse(courseData);
    };
    fetchData();
  }, [courseId]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-detail">
      <h2>{course.name}</h2>
      <p>{course.description}</p>
      <p>Rating: {course.rating}</p>
      <p>Price: ${course.price}</p>
    </div>
  );
}

export default CourseDetail;