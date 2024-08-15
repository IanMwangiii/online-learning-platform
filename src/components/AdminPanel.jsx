import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourseName, setNewCourseName] = useState('');
  const [newLesson, setNewLesson] = useState({ topic: '', content: '', video_url: '', course_id: '' });

  // Fetch courses and lessons
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5555/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddCourse = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5555/api/courses', { name: newCourseName });
      setCourses([...courses, response.data]);
      setNewCourseName('');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/api/courses/${courseId}`);
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleAddLesson = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5555/lessons', newLesson);
      const updatedCourses = courses.map(course => {
        if (course.id === newLesson.course_id) {
          course.lessons.push(response.data);
        }
        return course;
      });
      setCourses(updatedCourses);
      setNewLesson({ topic: '', content: '', video_url: '', course_id: '' });
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };

  const handleDeleteLesson = async (lessonId, courseId) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/lessons/${lessonId}`);
      const updatedCourses = courses.map(course => {
        if (course.id === courseId) {
          course.lessons = course.lessons.filter(lesson => lesson.id !== lessonId);
        }
        return course;
      });
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <h2>Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h3>{course.name}</h3>
            <button onClick={() => handleDeleteCourse(course.id)}>Delete Course</button>
            <ul>
              {course.lessons && course.lessons.map(lesson => (
                <li key={lesson.id}>
                  <p>{lesson.topic}</p>
                  <button onClick={() => handleDeleteLesson(lesson.id, course.id)}>Delete Lesson</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2>Add Course</h2>
      <input 
        type="text" 
        value={newCourseName} 
        onChange={(e) => setNewCourseName(e.target.value)} 
        placeholder="Course Name"
      />
      <button onClick={handleAddCourse}>Add Course</button>

      <h2>Add Lesson</h2>
      <input 
        type="text" 
        value={newLesson.topic} 
        onChange={(e) => setNewLesson({ ...newLesson, topic: e.target.value })} 
        placeholder="Lesson Topic"
      />
      <textarea 
        value={newLesson.content} 
        onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })} 
        placeholder="Lesson Content"
      />
      <input 
        type="text" 
        value={newLesson.video_url} 
        onChange={(e) => setNewLesson({ ...newLesson, video_url: e.target.value })} 
        placeholder="Video URL"
      />
      <select 
        value={newLesson.course_id} 
        onChange={(e) => setNewLesson({ ...newLesson, course_id: e.target.value })}
      >
        <option value="">Select Course</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </select>
      <button onClick={handleAddLesson}>Add Lesson</button>
    </div>
  );
};

export default AdminPanel;
