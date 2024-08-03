import React from 'react'
import { BsLayoutTextSidebar } from "react-icons/bs";
function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebar-header'>
        <BsLayoutTextSidebar />
        </div>
        <ul className='sidebar-menu'>
            <li>
                <a href="#dashboard">Dashboard</a>
            </li>
            <li>
                <a href="#courses">Courses</a>
            </li>
            <li>
                <a href="#profile">Profile</a>
            </li>
            <li>
                <a href="lessons">Lessons</a>
            </li>
        </ul>
        <div className='sidebar-buttons'>
            <button className='sidebar-btn'>Logout</button>
            <button className='sidebar-btn'>Help</button>
        </div>
    </div>
  )
}

export default Sidebar