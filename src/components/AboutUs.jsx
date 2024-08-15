import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to <strong>LearnSphere</strong>, your premier destination for online education. 
        Our platform offers a diverse range of courses tailored to help you achieve your educational goals, 
        whether you’re looking to advance your career, learn something new, or pursue a passion.
      </p>
      <div className="about-values">
        <h2>Our Core Values</h2>
        <ul>
          <li><strong>Quality Education:</strong> We partner with leading universities and companies to bring you top-notch content.</li>
          <li><strong>Accessibility:</strong> Our courses are available to everyone, everywhere, at any time.</li>
          <li><strong>Innovation:</strong> We leverage the latest technology to create an engaging and effective learning experience.</li>
          <li><strong>Community:</strong> Join a global network of learners, educators, and professionals.</li>
        </ul>
      </div>
      <div className="about-vision">
        <h2>Our Vision</h2>
        <p>
          At <strong>LearnSphere</strong>, we envision a world where education is accessible to all, empowering individuals to reach their full potential 
          and contribute positively to society. Our mission is to provide a platform that fosters continuous learning, personal growth, and global connectivity.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
