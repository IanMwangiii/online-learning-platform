import React from 'react';
import { FcBusinessman, FcSettings, FcSearch } from 'react-icons/fc';
import { IoMdNotificationsOutline } from 'react-icons/io';

const Navbar = ({ onUserClick, onHomeClick }) => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <button className="explore-button" onClick={onHomeClick}>EXPLORE</button>
          <div className="search-container">
            <input type="text" className="search-input" placeholder="Search..." />
            <button className="search-button"><FcSearch /></button>
          </div>
          <div className="nav-links">
            <ul className="nav-list">
              <li className="nav-item"><a href="#home" onClick={onHomeClick}>Home</a></li>
              <li className="nav-item"><a href="#online-degrees">Online degrees</a></li>
              <li className="nav-item"><a href="#notification"><IoMdNotificationsOutline /></a></li>
              <li className="nav-item"><a href="#login" className='login-link'>Login</a></li>
              <li className="nav-item"><a href="#calendar"><FcSettings /></a></li>
              <li className="nav-item"><a href="#user" onClick={onUserClick}><FcBusinessman /></a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
