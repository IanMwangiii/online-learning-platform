const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5555";

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return response.json();
};

export const fetchCourses = async () => {
  const response = await fetch(`${API_BASE_URL}/courses`);
  return response.json();
};

export const fetchCourseById = async (courseId) => {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}`);
  return response.json();
};

export const fetchLessonsByCourseId = async (courseId) => {
  const response = await fetch(`${API_BASE_URL}/lessons?course_id=${courseId}`);
  return response.json();
};

export const fetchDiscussions = async () => {
  const response = await fetch(`${API_BASE_URL}/discussions`);
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const enrollUserInCourse = async (enrollmentData) => {
  const response = await fetch(`${API_BASE_URL}/enrollments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enrollmentData),
  });
  return response.json();
};

