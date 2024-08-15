import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CoursePage = () => {
    const { courseId } = useParams(); // Retrieve courseId from route parameters
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourseDetails = async () => {
        try {
            if (!courseId) {
                throw new Error('Course ID is not defined');
            }
            setLoading(true);

            // Fetch course details
            const courseResponse = await axios.get(`http://127.0.0.1:5555/api/courses/${courseId}`);
            console.log('Course data:', courseResponse.data);
            setCourse(courseResponse.data);

            // Fetch lessons for the course
            const lessonsResponse = await axios.get(`http://127.0.0.1:5555/api/courses/${courseId}/lessons`);
            console.log('Lessons data:', lessonsResponse.data);
            setLessons(Array.isArray(lessonsResponse.data) ? lessonsResponse.data : []);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourseDetails();
    }, [courseId]); // Re-run when courseId changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{course?.title || 'Course Title'}</h1>
            <p>{course?.description || 'Course Description'}</p>
            <h2>Lessons</h2>
            {lessons.length > 0 ? (
                <ul>
                    {lessons.map((lesson) => (
                        <li key={lesson.id}>{lesson.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No lessons available.</p>
            )}
        </div>
    );
};

export default CoursePage;
