// src/Home.js
import React from 'react';
import Footer from './Footer';

function Home() {
  return (
    <div>
      <div className='home-page'>
        <div>
          <h1 className='home-text'>
            <ul className='intro-page'>
              <li className='intro-text'>
                Get to learn with us and be prepared for the modern world
              </li>
              <div className='home-button'>
                <button className='explores-button'>EXPLORE COURSES</button>
                <button className='join-button'>JOIN US</button>
              </div>
            </ul>
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
