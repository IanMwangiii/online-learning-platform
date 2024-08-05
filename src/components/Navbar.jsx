import React from 'react';
import { FcBusinessman, FcSettings, FcSearch } from 'react-icons/fc';
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="explore-button">EXPLORE</button>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="search-button"><FcSearch /></button>
        </div>
        <div className="nav-links">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/courses">Online degrees</Link></li>
            <li className="nav-item"><a href="#notification"><IoMdNotificationsOutline /></a></li>
            <li className="nav-item"><Link to="/login" className='login-link'>Login</Link></li>
            <li className="nav-item"><Link to="/profile"><FcBusinessman /></Link></li>
            <li className="nav-item"><a href="#setting"><FcSettings /></a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
