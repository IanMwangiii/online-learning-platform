// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
// import CourseList from './components/CourseList';
import UserProfile from './components/UserProfile';
import Notification from './components/Notification';
import SearchBar from './components/SearchBar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';
import Courses from './components/Courses';
// import PaymentPage from './components/PaymentPage';
import CoursePage from './components/CoursePage';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/payment/:id" element={<PaymentPage />} /> */}
          <Route path="/course/:id" element={<CoursePage />} />
        </Routes>
      </Router>
      <div>
        <Courses/>
      </div>
    </>
  );
}

export default App;
