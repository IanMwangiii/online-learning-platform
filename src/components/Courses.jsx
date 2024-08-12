import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../api';
import './App.css';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await fetchCourses();
      setCourses(coursesData);
    };
    fetchData();
  }, []);

  return (
    <div className="courses">
      <h2>Available Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>{course.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
