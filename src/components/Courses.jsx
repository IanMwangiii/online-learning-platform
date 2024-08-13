import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/api/courses')
      .then(response => {
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the courses!', error);
      });
  }, []);

  return (
    <div className="courses">
      <h1>Our Courses</h1>
      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map(course => (
            <div key={course.id} className="course-card">
              <h2>{course.name}</h2>
              <p>{course.description}</p>
              <p><strong>Rating:</strong> {course.rating}</p>
              <p><strong>Price:</strong> ${course.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
}

export default Courses;
