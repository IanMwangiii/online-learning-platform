import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLessonsByCourseId } from '../api';
import './App.css';

function LessonDetail() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const lessonData = await fetchLessonsByCourseId(lessonId);
      setLesson(lessonData);
    };
    fetchData();
  }, [lessonId]);

  if (!lesson) return <p>Loading...</p>;

  return (
    <div className="lesson-detail">
      <h2>{lesson.topic}</h2>
      <p>{lesson.content}</p>
      <video src={lesson.video_url} controls />
    </div>
  );
}

export default LessonDetail;