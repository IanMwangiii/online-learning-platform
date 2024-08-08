import React from 'react';
import { Link } from 'react-router-dom'; 
import { FcBusinessman, FcSearch } from 'react-icons/fc';
import { IoMdNotificationsOutline } from 'react-icons/io';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <li className="nav-item"><Link to="/dashboard">Dashboard</Link></li>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="search-button"><FcSearch /></button>
        </div>
        <div className="nav-links">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/courses">Courses</Link></li>
            <li className="nav-item"><Link to="#notifications"><IoMdNotificationsOutline /></Link></li>
            <li className="nav-item"><Link to="/login" className='login-link'>Login</Link></li>
            <li className="nav-item"><Link to="/user-profile"><FcBusinessman /></Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
