import { useState } from 'react';
import { enrollUserInCourse } from '../api';
import './App.css';

function Enrollment() {
  const [enrollmentData, setEnrollmentData] = useState({
    name: '',
    course_id: ''
  });

  const handleChange = (e) => {
    setEnrollmentData({ ...enrollmentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await enrollUserInCourse(enrollmentData);
    alert('Enrollment successful!');
  };

  return (
    <div className="enrollment">
      <h2>Enroll in a Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={enrollmentData.name} onChange={handleChange} />
        </label>
        <label>
          Course ID:
          <input type="text" name="course_id" value={enrollmentData.course_id} onChange={handleChange} />
        </label>
        <button type="submit">Enroll</button>
      </form>
    </div>
  );
}

export default Enrollment;