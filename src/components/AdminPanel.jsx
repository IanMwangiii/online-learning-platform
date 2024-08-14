import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import { Grid, CircularProgress, Typography, Button, TextField, Select, MenuItem } from '@mui/material';

const AdminPanel = () => {
  const [role, setRole] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [courseData, setCourseData] = useState({ title: '', description: '' });
  const [updateData, setUpdateData] = useState({ title: '', description: '' });
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserRole();
    fetchCourses();
    fetchUsers();
  }, []);

  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await axios.get('http://127.0.0.1:5555/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:5555/api/courses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses. Please try again.');
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:5555/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateCourse = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://127.0.0.1:5555/api/courses', courseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCourses();
      setCourseData({ title: '', description: '' });
      alert('Course created successfully!');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.put(`http://127.0.0.1:5555/api/courses/${selectedCourseId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCourses();
      setUpdateData({ title: '', description: '' });
      setSelectedCourseId(null);
      alert('Course updated successfully!');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://127.0.0.1:5555/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCourses();
      alert('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://127.0.0.1:5555/api/users', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
      setUserData({ username: '', email: '' });
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.put(`http://127.0.0.1:5555/api/users/${selectedUserId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
      setUpdateData({ username: '', email: '' });
      setSelectedUserId(null);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://127.0.0.1:5555/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return (
    <div>
      <Typography variant="h6" color="error">{error}</Typography>
      <Button variant="contained" color="primary" onClick={fetchCourses}>Retry</Button>
    </div>
  );

  if (role !== 'admin') return null;

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <p>Welcome, Admin! You have access to manage courses and users.</p>
      <div className="admin-actions">
        <Button onClick={() => setSelectedAction('manageCourses')}>Manage Courses</Button>
        <Button onClick={() => setSelectedAction('manageUsers')}>Manage Users</Button>
      </div>

      {selectedAction === 'manageCourses' && (
        <div className="manage-courses">
          <h2>Manage Courses</h2>
          <h3>Create New Course</h3>
          <TextField
            label="Course Title"
            name="title"
            value={courseData.title}
            onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
          />
          <TextField
            label="Course Description"
            name="description"
            value={courseData.description}
            onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
          />
          <Button onClick={handleCreateCourse}>Create Course</Button>

          <h3>Update Existing Course</h3>
          <Select
            value={selectedCourseId || ''}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <MenuItem value="">Select a Course</MenuItem>
            {courses.map(course => (
              <MenuItem key={course.id} value={course.id}>{course.title}</MenuItem>
            ))}
          </Select>
          {selectedCourseId && (
            <>
              <TextField
                label="Update Title"
                name="title"
                value={updateData.title}
                onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
              />
              <TextField
                label="Update Description"
                name="description"
                value={updateData.description}
                onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
              />
              <Button onClick={handleUpdateCourse}>Update Course</Button>
            </>
          )}

          <h3>Existing Courses</h3>
          <Grid container spacing={2}>
            {courses.map(course => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} />
                <Button onClick={() => handleDeleteCourse(course.id)}>Delete</Button>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {selectedAction === 'manageUsers' && (
        <div className="manage-users">
          <h2>Manage Users</h2>
          <h3>Create New User</h3>
          <TextField
            label="Username"
            name="username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <Button onClick={handleCreateUser}>Create User</Button>

          <h3>Update Existing User</h3>
          <Select
            value={selectedUserId || ''}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <MenuItem value="">Select a User</MenuItem>
            {users.map(user => (
              <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
            ))}
          </Select>
          {selectedUserId && (
            <>
              <TextField
                label="Update Username"
                name="username"
                value={updateData.username}
                onChange={(e) => setUpdateData({ ...updateData, username: e.target.value })}
              />
              <TextField
                label="Update Email"
                name="email"
                value={updateData.email}
                onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
              />
              <Button onClick={handleUpdateUser}>Update User</Button>
            </>
          )}

          <h3>Existing Users</h3>
          <Grid container spacing={2}>
            {users.map(user => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Typography variant="h6">{user.username}</Typography>
                <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
