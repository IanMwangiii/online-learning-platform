import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import CoursePage from './components/CoursePage';
import Login from './components/Login';
import SignUp from './components/Signup';
import UserProfile from './components/UserProfile';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="user-profile" element={<UserProfile/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;

